use axum::http::{HeaderValue, Method};
use dotenv::dotenv;
use rspc;
use sqlx::postgres::PgPoolOptions;
use tower_http::cors::CorsLayer;

mod routes;

use routes::{
    context::RouterContext, gallery::gallery_router, games::games_router, message::message_router,
};

#[tokio::main]
async fn main() {
    dotenv().ok();
    let host = std::env::var("HOST").unwrap_or("127.0.0.1".into());
    let port = std::env::var("PORT")
        .unwrap_or("8080".into())
        .parse::<u16>()
        .expect("invalid port specified");
    let db_url = std::env::var("DATABASE_URL").expect("No DATABASE_URL specified");

    let db = PgPoolOptions::new()
        .connect(&db_url)
        .await
        .expect("Cannot connect to db");

    let router = rspc::Router::<RouterContext>::new()
        .config(
            rspc::Config::new()
                .set_ts_bindings_header("/* eslint-disable */")
                .export_ts_bindings(
                    std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                        .join("../frontend-next/src/bindings.ts"),
                ),
        )
        .query("version", |t| {
            t(|_ctx, _input: ()| env!("CARGO_PKG_VERSION"))
        })
        .merge("messages.", message_router())
        .merge("gallery.", gallery_router())
        .merge("games.", games_router())
        .build()
        .arced();

    let cors = CorsLayer::new().allow_methods([Method::GET]).allow_origin(
        std::env::var("CORS_ALLOW_ORIGIN")
            .unwrap()
            .parse::<HeaderValue>()
            .unwrap(),
    );

    let app = axum::Router::new()
        .route(
            "/rspc/:id",
            router.endpoint(|| RouterContext { db: db.into() }).axum(),
        )
        .layer(cors);

    let listen = format!("{}:{}", host, port);

    println!("listening on {}", listen);
    axum::Server::bind(&listen.parse().unwrap())
        .serve(app.into_make_service())
        .await
        .expect("server died");
}
