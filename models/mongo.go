package models

import (
	"gopkg.in/mgo.v2"
	"log"
	"os"
)

var session *mgo.Session

func init() {
	var err error
	session, err = mgo.Dial(os.Getenv("MONGO_RS_PORT_27017_TCP_ADDR"))
	if err != nil {
		log.Fatal(err)
	}
}

func getArticleC() *mgo.Collection {
	return session.DB("blog").C("article")
}
