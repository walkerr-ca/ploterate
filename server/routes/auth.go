package routes

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func login(c echo.Context) error {
	return c.String(http.StatusOK, "Login")
}

func BuildAuthRoutes(e *echo.Echo) {
	g := e.Group("/auth")

	g.GET("/login", login)
}
