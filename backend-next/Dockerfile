FROM lukemathwalker/cargo-chef:0.1.51-rust-1.67 AS chef
WORKDIR app

FROM chef as planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef as builder
COPY --from=planner /app/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

FROM chef as app-builder
COPY --from=builder /app/* .
COPY . .
RUN cargo build
RUN ls /app/target/debug/

FROM debian:11-slim as runtime
EXPOSE 4000
WORKDIR app
COPY --from=app-builder /app/target/debug/backend-next /usr/local/bin
ENTRYPOINT ["/usr/local/bin/backend-next"]
