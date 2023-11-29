const express = require('express');
const router = express.Router();
const mongodb = require("../db/mongodb");

router.post('/user/info', async (req, res) => {
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
    }else {
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
})

module.exports = router;
