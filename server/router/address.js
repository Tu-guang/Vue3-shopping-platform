const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require('../db/mongodb');


router.post('/address/addAll', async (req, res) => {
    console.log(req.body);
    let x = [{
        "id": 1,
        user_id: 1,
        "username": "陈111",
        "phone": "18888888888",
        "address": "No. 189, Grove St, Los Angeles",
        "is_default": 0
    },
        {
            "id": 2,
            user_id: 1,
            "username": "李1",
            "phone": "188888888890",
            "address": "No. 189, Grove St, Los Angeles",
            "is_default": 0
        },
        {
            "id": 3,
            user_id: 1,
            "username": "王",
            "phone": "18888888890",
            "address": "No. 189, Grove St, Los Angeles",
            "is_default": 0
        },
        {
            "id": 4,
            user_id: 1, "username": "xx1", "phone": "17376250391", "address": "abc", "is_default": 1
        }
    ]
    var data = await mongodb.insertMany('address', x); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});
router.post('/address/list', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.getData('address', req.body.user_id); // 在这里加上await关键字
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
    let temp = await mongodb.getData('address')
    req.body.id = temp.length + 1;
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
    await mongodb.updateMany('address', {user_id: req.body.user_id}, {is_default: 0}); // 在这里加上await关键字
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
