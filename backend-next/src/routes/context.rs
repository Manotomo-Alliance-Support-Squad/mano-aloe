use sqlx::{PgPool};

pub struct RouterContext {
    pub db: PgPool
}