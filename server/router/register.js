const express = require('express');
const router = express.Router();
const mongodb = require("../db/mongodb");

router.post('/register', async (req, res) => {
    console.log(req.body);
    if (req.body.username === "") {
        res.send({
            code: 0,
            msg: "参数错误"
        })
        return
    }
    var newVar = await mongodb.getData('user');
    console.log(newVar.length)
    let addObj = {
        id: newVar.length + 1,
        ...req.body
    }
    var data = await mongodb.insertDocument('user', addObj); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "注册成功",
            "result": ""
        })
    } else {
        res.send({
            "code": 500,
            "msg": "存在相同账号",
            "result": ""
        })
    }
});

module.exports = router;
