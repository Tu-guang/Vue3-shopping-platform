const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require('../db/mongodb');

router.post('/order/add', async (req, res) => {
    console.log(req.body);
    let x = [
        {
            "id": "1729012423043584002",
            user_id: 1,
            "createTime": "2023-11-27 13:41:00",
            "payType": 1,
            "orderState": 2,
            "payLatestTime": "2023-11-27 14:11:00",
            "postFee": 0.00,
            "payMoney": 29.90,
            "totalMoney": 29.90,
            "totalNum": 1,
            "skus": [
                {
                    "id": "1729012423047778306",
                    "spuId": 4026450,
                    "name": "三体",
                    "quantity": 1,
                    "image": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
                    "realPay": 29.90,
                    "curPrice": 29.90,
                    "totalMoney": null,
                }
            ],
            "payChannel": 1,
            "countdown": -1,
            "appraise_text": "评价1"
        },
        {
            "id": "1728808512831623170",
            user_id: 1,
            "createTime": "2023-11-27 00:10:44",
            "payType": 1,
            "orderState": 1,
            "payLatestTime": "2023-11-27 00:40:44",
            "postFee": 9.00,
            "payMoney": 59.00,
            "totalMoney": 50.00,
            "totalNum": 30,
            "skus": [
                {
                    "id": "1728808512877760515",
                    "spuId": 4026178,
                    "name": "三国演义",
                    "quantity": 2,
                    "image": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
                    "realPay": 118.00,
                    "curPrice": 59.00,
                    "totalMoney": null,
                }
            ],
            "payChannel": 1,
            "countdown": -1,
            "appraise_text": ""
        }
    ]
    var data = await mongodb.insertMany('order', x); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});

router.post('/order/list', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.getData('order', req.body.user_id); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});

router.post('/order/del/:id', async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    var data = await mongodb.deleteById('order', parseInt(id)); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});

router.post('/order/update', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.updateById('order', req.body.id, req.body); // 在这里加上await关键字
    if (data === true) {
        console.log(data)
        res.send({
            "code": 200,
            "msg": "操作成功",
            "result": ""
        })
    }
});

module.exports = router;
