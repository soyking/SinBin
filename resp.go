package main

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
