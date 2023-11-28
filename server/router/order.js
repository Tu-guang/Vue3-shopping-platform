const express = require('express');
const router = express.Router();
const mongodb = require('../db/mongodb');

router.post('/order/addAll', async (req, res) => {
    console.log(req.body);
    let x = [
        {
            "id": "1729012423043584005",
            user_id: 2,
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
            "id": "1728808512831623177",
            user_id: 2,
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

router.post('/order/add', async (req, res) => {
    console.log(req.body);
    const date = new Date();
    // 获取年份、月份、日期、小时、分钟和秒数的字符串表示
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 生成日期和时间字符串
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // 生成一个随机数，并将其转换为字符串形式
    const randomNumber = Math.floor(Math.random() * Math.pow(10, 16)).toString();
    // 生成一个时间戳，并将其转换为字符串形式
    const timestamp = Date.now().toString();
    // 将两个字符串拼接起来，得到最终的随机字符串
    const randomString = `${timestamp}${randomNumber}`;

    let x = [
        {
            "id": randomString,
            "user_id": req.body.user_id,
            "createTime": dateTimeString,
            "orderState": 2,
            "postFee": 0,
            "payMoney": parseFloat(req.body.price),
            "totalMoney": parseFloat(req.body.price),
            "skus": [
                {
                    "id": randomString,
                    "spuId": req.body.id,
                    "name": req.body.name,
                    "image": req.body.picture,
                    "realPay": parseFloat(req.body.price),
                    "curPrice": parseFloat(req.body.price),
                }
            ],
            "payChannel": 1,
            "countdown": -1,
            "appraise_text": ""
    }]
    var data = await mongodb.insertMany('order', x); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": ""
    })
});

router.post('/order/list', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.getData('order', req.body.user_id); // 在这里加上await关键字
    console.log(data)
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
