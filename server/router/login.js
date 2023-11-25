const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
// const connect = require('../db/mysql');

router.post('/login', (req, res) => {
    console.log(req.body);

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
});

module.exports = router;
