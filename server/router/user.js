const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
// const connect = require('../db/mysql');

router.post('/user/info', (req, res) => {
    console.log(req.body);
    // {
    //     "account"
    // :
    //     "demo",
    //         "password"
    // :
    //     "hm#qd@23!"
    // }

    // connect.query(
    //     'SELECT * FROM user WHERE username = ? AND password = ?',
    //     [req.body.username, req.body.password],
    //     (err, rows) => {
    //         if (err) console.log(err); // 如果出现错误就输出错误信息
    //         console.log(rows); // 输出查询结果
    //         if (rows.length !== 0) {
    //             const token = Jwt.signToken(req.body.username, req.body.password);
    //             res.send({ code: 200, msg: '登陆成功', token: token });
    //         } else {
    //             res.send({ code: 500, msg: '登陆失败' });
    //         }
    //     }
    // );
    res.send({
        "code": "1",
        "msg": "操作成功",
        "result": {
            "id": "295",
            "account": "demo",
            "mobile": "13322222409",
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCJkZW1vXCIsXCJpZFwiOlwiMjk1XCIsXCJ1c2VybmFtZVwiOlwiZGVtb1wifSIsImlhdCI6MTcwMTA1MjA0MywiZXhwIjoxNzAxMzExMjQzfQ.ouDpjsFkAT6YnGDWB8WHQZx6g2ek7lGRUGAo3X75SYM",
            "avatar": "http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/avatar/2023-10-31/e9b1bbbb-b478-45fd-9dab-b10d01d5a08e.png",
            "nickname": "demo",
            "gender": "男",
            "birthday": "2023-10-26",
            "cityCode": "",
            "provinceCode": "",
            "profession": "前端开发 工程师666"
        }
    })
});

module.exports = router;
