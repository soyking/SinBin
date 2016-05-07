package main

import (
	"encoding/json"
	"net/http"
)

type resp struct {
	Code int         `json:"code" bson:"code"`
	Msg  string      `json:"msg" bson:"msg"`
	Data interface{} `json:"data,omitempty" bson:"data"`
}

func buildResp(code int, msg string, data ...interface{}) *resp {
	r := resp{Code: code, Msg: msg}
	if len(data) != 0 {
		r.Data = data[0]
	}
	return &r
}

func buildCommon(data interface{}, err error) *resp {
	if err != nil {
		return buildResp(400, err.Error())
	} else {
		return buildResp(200, "success", data)
	}
}

func writeResp(w http.ResponseWriter, data interface{}, err error) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	b, _ := json.Marshal(buildCommon(data, err))
	w.Write(b)
}
