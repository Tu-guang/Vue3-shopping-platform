const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require("../db/mongodb");
router.post('/login', async (req, res) => {
    console.log(req.body);
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
            code: 500,
            msg: "账号或密码错误",
            result: ""
        })
    }
});

module.exports = router;
