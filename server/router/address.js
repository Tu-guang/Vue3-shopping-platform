const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require('../db/mongodb');

router.post('/address/list', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.getData('address'); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});

router.post('/address/del/:id', async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    var data = await mongodb.deleteById('address', parseInt(id)); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});

router.post('/address/update', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.updateById('address', req.body.id, req.body); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});

router.post('/address/add', async (req, res) => {
    console.log(req.body);
    if (req.body.username === "") {
        res.send({
            code: 0,
            msg: "参数错误"
        })
        return
    }
    var data = await mongodb.insertDocument('address', req.body); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});

router.post('/address/set_default/:id', async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    if (req.body.username === "") {
        res.send({
            code: 0,
            msg: "参数错误"
        })
        return
    }
    await mongodb.updateMany('address', {}, {is_default: 0}); // 在这里加上await关键字
    var data2 = await mongodb.updateById('address', parseInt(id), {is_default: 1}); // 在这里加上await关键字
    if (data2 === true) {
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});


module.exports = router;
