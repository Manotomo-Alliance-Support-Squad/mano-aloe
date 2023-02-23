use rspc::{Error, ErrorCode, Router, RouterBuilder, Type};
use serde::Serialize;
use sqlx::{query_as, FromRow};
use uuid::Uuid;

use super::context::RouterContext;

pub fn gallery_router() -> RouterBuilder<RouterContext> {
    Router::<RouterContext>::new().query("gallery", |t| {
        #[derive(Serialize, FromRow, Type)]
        struct Art {
            id: Uuid,
            username: String,
            title: String,
            art_link: String,
            artist_link: Option<String>,
        }

        #[derive(Serialize, Type)]
        struct GalleryResponse {
            count: usize,
            gallery: Vec<Art>,
        }

        t(|ctx, _input: ()| async move {
            let RouterContext { db } = ctx;
            let gallery = query_as!(
                Art,
                r#"
                SELECT
                    id,
                    username,
                    title,
                    art_link,
                    artist_link
                FROM gallery;
                "#
            )
            .fetch_all(&db)
            .await
            .map_err(|_| Error::new(ErrorCode::BadRequest, "Something went wrong".into()))?;

            Ok(GalleryResponse {
                count: gallery.len(),
                gallery,
            })
        })
    })
}
