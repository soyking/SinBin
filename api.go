package main

import (
	"blog/models"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
)

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "static/dist/index.html")
}

func apiJSONHandler(fn func(*http.Request) (interface{}, error)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		b, _ := json.Marshal(buildCommon(fn(r)))
		w.Write(b)
	}
}

func unmarshalRequest(r *http.Request, request interface{}) error {
	body, _ := ioutil.ReadAll(r.Body)
	return json.Unmarshal(body, request)
}

func publishArticle(r *http.Request) (interface{}, error) {
	var request models.Article
	if err := unmarshalRequest(r, &request); err != nil {
		return nil, err
	} else {
		return nil, request.Save()
	}
}

func getArticleList(r *http.Request) (interface{}, error) {
	var request struct {
		Page int `json:"page" bson:"page"`
		Size int `json:"size" bson:"size"`
	}
	if err := unmarshalRequest(r, &request); err != nil {
		return nil, err
	} else {
		return models.GetArticleList(request.Page, request.Size)
	}
}

func getOneArticle(r *http.Request) (interface{}, error) {
	vars := mux.Vars(r)
	id := vars["id"]
	return models.GetOneArticle(id)
}
