package main

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/walkerr-ca/ploterate/server/internal/handlers"
	"github.com/walkerr-ca/ploterate/server/internal/storage"
)

func main() {
	godotenv.Load()

	e := echo.New()
	e.Use(middleware.RequestLogger())

	ctx := context.Background()
	conn, err := pgx.Connect(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}

	defer conn.Close(ctx)
	client := storage.New(conn)

	api := e.Group("/api")
	app := &handlers.App{
		Client: client,
	}

	app.RegisterAuth(api)

	err = os.Mkdir("./server/static", os.ModePerm)
	log.Print(err)
	if err != nil {
		e.Static("/", "./server/static")
	}

	config := echo.StartConfig{
		Address: ":8080",
	}

	if err := config.Start(context.Background(), e); err != nil {
		e.Logger.Error("Failed to start server", "error", err)
	}
}
