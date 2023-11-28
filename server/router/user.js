const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require("../db/mongodb");
// const connect = require('../db/mysql');

router.post('/user/info', async (req, res) => {
    console.log(req.body);
    // res.send({
    //     "code": "1",
    //     "msg": "操作成功",
    //     "result": {
    //         "id": "295",
    //         "account": "demo",
    //         "mobile": "13322222409",
    //         "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCJkZW1vXCIsXCJpZFwiOlwiMjk1XCIsXCJ1c2VybmFtZVwiOlwiZGVtb1wifSIsImlhdCI6MTcwMTA1MjA0MywiZXhwIjoxNzAxMzExMjQzfQ.ouDpjsFkAT6YnGDWB8WHQZx6g2ek7lGRUGAo3X75SYM",
    //         "avatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/avatar/2023-10-31/e9b1bbbb-b478-45fd-9dab-b10d01d5a08e.png",
    //         "nickname": "demo",
    //         "gender": "男",
    //         "birthday": "2023-10-26",
    //         "cityCode": "",
    //         "provinceCode": "",
    //         "profession": "前端开发 工程师666"
    //     }
    // })
    console.log(req.body);
    var data = await mongodb.queryData('user', req.body.user_id); // 在这里加上await关键字
    if (data !== {}) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": data
        })
    } else {
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": {}
        })
    }
});

router.post("/user/info/update", async (req, res) => {
    console.log(req.body);
    var data = await mongodb.updateById('user', req.body.id, req.body); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
})

module.exports = router;
