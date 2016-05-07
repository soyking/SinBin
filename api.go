package main

import (
	"blog/models"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
)

func unmarshalRequest(r *http.Request, request interface{}) error {
	body, _ := ioutil.ReadAll(r.Body)
	return json.Unmarshal(body, request)
}

func apiJSONHandler(fn func(*http.Request) (interface{}, error)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data, err := fn(r)
		writeResp(w, data, err)
	}
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

func publishMoment(r *http.Request) (interface{}, error) {
	var request models.Moment
	if err := unmarshalRequest(r, &request); err != nil {
		return nil, err
	} else {
		return nil, request.Save()
	}
}

func getMomentList(r *http.Request) (interface{}, error) {
	var request struct {
		Page int `json:"page" bson:"page"`
		Size int `json:"size" bson:"size"`
	}
	if err := unmarshalRequest(r, &request); err != nil {
		return nil, err
	} else {
		return models.GetMomentList(request.Page, request.Size)
	}
}
