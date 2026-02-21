-- name: GetUser :one
select * from "user" where id = $1;

-- name: CreateUser :one
insert into "user" (email, username, first_name, last_name, description, status, flag, type, password, otp_token, is_otp)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *;
