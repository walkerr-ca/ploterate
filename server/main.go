package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/walker-121g/bookish/server/routes"
	_ "github.com/walker-121g/bookish/server/services"
)

func main() {
	log.SetFlags(-1)

	err := godotenv.Load()
	if err != nil {
		log.Fatal("{startup} An error occurred while loading the environment.")
	}

	e := echo.New()
	e.Use(middleware.Logger())

	routes.BuildAuthRoutes(e)

	e.Logger.Fatal(e.Start(":8080"))
}
