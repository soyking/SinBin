import mockxhr from "mockxhr";

mockxhr.setMock(true);

mockxhr.mock(
    "GET",
    "/moments",
    data => {
        return {"data":[
            {"id":1,"moment":"今天天气晴","date":"2016-03-16"},
            {"id":2,"moment":"今天天气阴","date":"2016-03-13"}
        ]};
    }
);
