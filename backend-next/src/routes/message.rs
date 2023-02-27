use rspc::{Error, ErrorCode, Router, RouterBuilder, Type};
use serde::{Serialize};
use sqlx::{query_as, FromRow};
use uuid::Uuid;

use super::context::RouterContext;


pub fn message_router() -> RouterBuilder<RouterContext> {
    Router::<RouterContext>::new().query("messages", |t| {

        #[derive(Serialize, FromRow, Type)]
        struct Message {
            id: Uuid,
            username: String,
            orig_msg: String,
            tl_msg: Option<String>,
            country: Option<String>,
        }

        #[derive(Serialize, Type)]
        struct MessagesResponse {
            count: usize,
            messages: Vec<Message>,
        }

        t(|ctx, _input: ()| async move {
            let RouterContext { db } = ctx;
            let messages = query_as!(
                Message,
                r#"
                SELECT
                  id,
                  username,
                  orig_msg,
                  tl_msg,
                  country
                FROM messages;
                "#
            )
            .fetch_all(&db)
            .await
            .map_err(|_| Error::new(ErrorCode::BadRequest, "Something went wrong".into()))?;

            Ok(MessagesResponse {
                count: messages.len(),
                messages,
            })
        })
    })
}
