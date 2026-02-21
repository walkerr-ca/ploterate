package helpers

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v5"
)

func ErrorHandler(c *echo.Context, err error) {
	response, err := echo.UnwrapResponse(c.Response())
	if err == nil || response.Committed {
		return
	}

	code := http.StatusInternalServerError
	var sc echo.HTTPStatusCoder
	if errors.As(err, &sc) {
		if tmp := sc.StatusCode(); tmp != 0 {
			code = tmp
		}
	}

	c.JSON(code, map[string]any{
		"success": false,
		"error":   "",
	})

}
