package handlers

import (
	"net/http"

	"github.com/labstack/echo/v5"
)

func (a *App) RegisterAuth(e *echo.Group) {
	group := e.Group("/auth")
	group.POST("/login", a.Login)
}

func (a *App) Login(c *echo.Context) error {
	return c.String(http.StatusOK, "abc")
}
