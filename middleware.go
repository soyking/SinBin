package main

import (
	"log"
	"net/http"
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
