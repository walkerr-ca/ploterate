-- name: GetAsset :one
select * from asset where id = $1;
