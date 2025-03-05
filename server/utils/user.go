package utils

import (
	"github.com/walker-121g/bookish/server/services"
)

type User struct {
	Id int `json:"id"`
}

func GetUser() (User, error) {
	db := services.GetDatabase()
	row := db.QueryRow("SELECT id FROM users LIMIT 1")
	if row.Err() != nil {
		return User{}, row.Err()
	}

	var user User
	err := row.Scan(&user.Id)
	if err != nil {
		return User{}, err
	}

	return user, nil
}
