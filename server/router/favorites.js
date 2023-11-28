const express = require('express');
const router = express.Router();
const Jwt = require('../util/getJwt');
const mongodb = require('../db/mongodb');

router.post('/favorites/add', async (req, res) => {
    console.log(req.body);
    let x = [
        {
            "id": 1,
            "user_id":1,
            "name": "历史的棋局",
            "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
            "price": "581.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
            "orderNum": 992,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 2,
            "user_id":2,
            "name": "历史的棋局",
            "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
            "price": "581.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
            "orderNum": 992,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 3,
            "user_id":1,
            "name": "活着",
            "desc": "同名电影《活着》由张艺谋执导，葛优、巩俐两大影帝影后主演1994年该片在第47届戛纳电影节上斩获评委会大奖，最佳男演员奖同时还荣获了英国电影学院奖最佳外语片等重要奖项。",
            "price": "125.00",
            "picture": "https://wfqqreader-1252317822.image.myqcloud.com/cover/464/834464/t6_834464.jpg",
            "orderNum": 3071,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 4,
            "user_id":1,
            "name": "三国演义",
            "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
            "price": "89.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
            "orderNum": 1300,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 5,
            "user_id":1,
            "name": "三体",
            "desc": "刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》!关于宇宙最狂野的想象!就是它!征服世界的中国科幻神作!包揽九项世界顶级科幻大奖!出版16个语种，横扫30国读者!奥巴马雷军、马化腾、周鸿柿、潘石屹、扎克伯格.....强推!",
            "price": "89.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
            "orderNum": 1350,
            "time": "2023-11-20 11:30:00"
        }
    ]
    var data = await mongodb.insertMany('favorites', x); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});

router.post('/favorites/list', async (req, res) => {
    console.log(req.body);
    var data = await mongodb.getData('favorites',req.body.user_id); // 在这里加上await关键字
    // console.log(data)
    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": data
    })
});

router.post('/favorites/del/:id', async (req, res) => {
    console.log(req.body);
    const id = req.params.id;
    var data = await mongodb.deleteById('favorites', parseInt(id)); // 在这里加上await关键字
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
