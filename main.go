package main 

import (
	"github.com/gorilla/mux"
	"github.com/justinas/alice"
	"log"
	"net/http"
	"os"
	"strings"
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

func staticHandleFunc(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.Path, "public", "static", 1)[1:]
	if _, err := os.Stat(path); err == nil {
		w.Header().Set("Cache-Control", "max-age=10")
		http.ServeFile(w, r, path)
	} else {
		http.NotFound(w, r)
	}
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/dist/index.html")
	})

	http.HandleFunc("/public/dist/", staticHandleFunc)
	http.Handle("/", alice.New(logHandler).Then(r))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
