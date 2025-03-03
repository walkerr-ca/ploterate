#[macro_use] extern crate rocket;
#[path = "./groups/auth.rs"] mod auth;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .mount("/auth", routes![auth::login])
}
