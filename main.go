package main

import (
	"github.com/gorilla/mux"
	"github.com/justinas/alice"
	"log"
	"net/http"
	"os"
	"strings"
)

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/dist/index.html")
}

func staticHandleFunc(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.Path, "public", "static", 1)[1:]
	if _, err := os.Stat(path); err == nil {
		w.Header().Set("Cache-Control", "max-age=600")
		http.ServeFile(w, r, path)
	} else {
		http.NotFound(w, r)
	}
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/", home).Methods("GET")

	r.Handle("/admin/article", alice.New(authHandler).ThenFunc(apiJSONHandler(publishArticle))).Methods("POST")
	r.Handle("/admin/moment", alice.New(authHandler).ThenFunc(apiJSONHandler(publishMoment))).Methods("POST")

	r.HandleFunc("/api/article", apiJSONHandler(getArticleList)).Methods("POST")
	r.HandleFunc("/api/article/{id}", apiJSONHandler(getOneArticle)).Methods("GET")
	r.HandleFunc("/api/moment", apiJSONHandler(getMomentList)).Methods("POST")

	http.HandleFunc("/public/dist/", staticHandleFunc)
	http.Handle("/", alice.New(logHandler).Then(r))

	log.Fatal(http.ListenAndServe(":8080", nil))
}
