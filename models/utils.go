package models

import (
	"crypto/rand"
	"fmt"
)

func GenUUID() string {
	b := make([]byte, 4)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
