const webpush = require("web-push");
//const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
    "mailto:test@faztweb.com",
    "BJOV9XGc6SPbGanxU8nPZoBsWR3IXxaK5j8MjGxiLd9LL5QtTrdKIuTlDOMYViqnwN4UkerTlQvKjN6BYkAQ-zQ",
    "_X6oJHd0TmhH_jctc4hiOkJQYHOyHu6KRXQN5soaHZ4"
);

module.exports = webpush;