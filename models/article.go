package models

import (
	"time"
)

type ArticleKey struct {
	Id    string `json:"id" bson:"id"`
	Title string `json:"title" bson:"title"`
	Date  int64  `json:"date" bson:"date"`
}

type Article struct {
	ArticleKey `bson:",inline"`
	Content    string `json:"content" bson:"content"`
}

func (a *Article) Save() error {
	a.Id = GenUUID()
	a.Date = time.Now().Unix()
	return getArticleC().Insert(a)
}

func GetArticleList(page, size int) (interface{}, error) {
	query := map[string]interface{}{}
	total, err := getArticleC().Find(query).Count()
	if err != nil {
		return nil, err
	}

	var results []ArticleKey
	err = getArticleC().Find(query).Skip(page * size).Limit(size).Sort("-date").All(&results)
	if err != nil {
		return nil, err
	}

	var resp = struct {
		Total   int          `json:"total" bson:"total"`
		Results []ArticleKey `json:"results" bson:"results"`
	}{total, results}
	return resp, nil
}

func GetOneArticle(id string) (*Article, error) {
	var result Article
	query := map[string]interface{}{"id": id}
	err := getArticleC().Find(query).One(&result)
	return &result, err
}
