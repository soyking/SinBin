package models

import (
	"time"
)

type Moment struct {
	Id      string `json:"id" bson:"id"`
	Content string `json:"content" bson:"content"`
	Date    int64  `json:"date" bson:"date"`
}

func (m *Moment) Save() error {
	m.Id = GenUUID()
	m.Date = time.Now().Unix()
	return getMomentC().Insert(m)
}

func GetMomentList(page, size int) (interface{}, error) {
	query := map[string]interface{}{}
	total, err := getMomentC().Find(query).Count()
	if err != nil {
		return nil, err
	}

	var results []Moment
	err = getMomentC().Find(query).Skip(page * size).Limit(size).Sort("-date").All(&results)
	if err != nil {
		return nil, err
	}

	var resp = struct {
		Total   int      `json:"total" bson:"total"`
		Results []Moment `json:"results" bson:"results"`
	}{total, results}
	return resp, nil
}
