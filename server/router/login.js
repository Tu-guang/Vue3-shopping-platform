const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require("../db/mongodb");
router.post('/login', async (req, res) => {
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
    var newVar = await mongodb.query("user", {account: req.body.account, password: req.body.password});
    console.log(newVar)
    if (newVar !== null) {
        let token = Jwt.signToken(newVar.account, newVar.id)
        res.send({
            code: 200,
            msg: "操作成功",
            result: {
                token: token
            }
        })
    } else {
        res.send({
            code: 200,
            msg: "账号或密码错误",
            result: ""
        })
    }
});

module.exports = router;
