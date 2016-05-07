package main

import (
	"errors"
	"log"
	"net/http"
	"os"
	"time"
)

func logHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()
		next.ServeHTTP(w, r)
		endTime := time.Now()
		log.Printf("[%s] %s %.3fms", r.Method, r.URL.Path, float64(endTime.Sub(startTime).Nanoseconds())/1000000)
	}

	return http.HandlerFunc(fn)
}

var code = os.Getenv("BLOG_CODE")
var errAuth = errors.New("no rights")

func authHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Query().Get("code") != code {
			writeResp(w, nil, errAuth)
		} else {
			next.ServeHTTP(w, r)
		}
	}

	return http.HandlerFunc(fn)
}
