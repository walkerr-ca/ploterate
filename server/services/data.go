package services

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	connectionUrl := os.Getenv("DATABASE_URL")
	newDb, err := sql.Open("postgres", connectionUrl)
	if err != nil {
		log.Fatal("{startup} An error occurred while trying to connect to the database.")
	}

	db = newDb
}

func GetDatabase() *sql.DB {
	return db
}
