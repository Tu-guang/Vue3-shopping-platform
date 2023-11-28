const express = require('express');
const router = express.Router();
const mongodb = require('../db/mongodb');

router.post('/base/addAll', async (req, res) => {
    console.log(req.body);
    await mongodb.deleteMany('user')
    let users = [{
        "id": 1,
        "account": "admin",
        "password": "abc123456",
        "mail": "tuguang162640@163.com",
        "phone": "100869",
        "sex": "0",
        "username": "xiao1",
        "avatar": " http://localhost:8081/uploads/202310261698305600574310.jpg",
        "user_id": 1
    }, {
        "id": 2,
        "account": "admin1",
        "password": "abc123456",
        "mail": "tuguang@163.com",
        "phone": "10086911",
        "sex": "0",
        "username": "xiao1111",
        "avatar": " http://localhost:8081/uploads/202310261698305600574310.jpg",
        "user_id": 2
    }]
    await mongodb.insertMany('user', users); // 在这里加上await关键字

    await mongodb.deleteMany('address')
    let address = [{
        "id": 1,
        "user_id": 1,
        "username": "陈111",
        "phone": "18888888888",
        "address": "No. 189, Grove St, Los Angeles",
        "is_default": 1
    }, {
        "id": 2,
        "user_id": 1,
        "username": "李1",
        "phone": "188888888890",
        "address": "No. 189, Grove St, Los Angeles",
        "is_default": 0
    }, {
        "id": 3,
        "user_id": 1,
        "username": "王",
        "phone": "18888888890",
        "address": "No. 189, Grove St, Los Angeles",
        "is_default": 0
    }, {"id": 4, "username": "xxxx", "phone": "xxxx", "address": "xxxx", "is_default": 1, "user_id": 2}]
    await mongodb.insertMany('address', address); // 在这里加上await关键字

    await mongodb.deleteMany('favorites')
    let favorites = [{
        "id": 1,
        "user_id": 1,
        "name": "历史的棋局",
        "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
        "price": "581.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
        "orderNum": 992,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 2,
        "user_id": 2,
        "name": "历史的棋局",
        "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
        "price": "581.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
        "orderNum": 992,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 3,
        "user_id": 1,
        "name": "活着",
        "desc": "同名电影《活着》由张艺谋执导，葛优、巩俐两大影帝影后主演1994年该片在第47届戛纳电影节上斩获评委会大奖，最佳男演员奖同时还荣获了英国电影学院奖最佳外语片等重要奖项。",
        "price": "125.00",
        "picture": "https://wfqqreader-1252317822.image.myqcloud.com/cover/464/834464/t6_834464.jpg",
        "orderNum": 3071,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 4,
        "user_id": 1,
        "name": "三国演义",
        "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
        "price": "89.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
        "orderNum": 1300,
        "time": "2023-11-20 11:30:00"
    }]
    await mongodb.insertMany('favorites', favorites); // 在这里加上await关键字

    await mongodb.deleteMany('footprint')
    let footprint = [{
        "id": 1,
        "user_id": 1,
        "name": "历史的棋局",
        "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
        "price": "581.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
        "orderNum": 992,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 2,
        "user_id": 1,
        "name": "活着",
        "desc": "同名电影《活着》由张艺谋执导，葛优、巩俐两大影帝影后主演1994年该片在第47届戛纳电影节上斩获评委会大奖，最佳男演员奖同时还荣获了英国电影学院奖最佳外语片等重要奖项。",
        "price": "125.00",
        "picture": "https://wfqqreader-1252317822.image.myqcloud.com/cover/464/834464/t6_834464.jpg",
        "orderNum": 3071,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 3,
        "user_id": 1,
        "name": "三国演义",
        "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
        "price": "89.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
        "orderNum": 1300,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 4,
        "user_id": 1,
        "name": "三体",
        "desc": "刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》!关于宇宙最狂野的想象!就是它!征服世界的中国科幻神作!包揽九项世界顶级科幻大奖!出版16个语种，横扫30国读者!奥巴马雷军、马化腾、周鸿柿、潘石屹、扎克伯格.....强推!",
        "price": "89.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
        "orderNum": 1350,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 5,
        "user_id": 2,
        "name": "三国演义",
        "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
        "price": "89.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
        "orderNum": 1300,
        "time": "2023-11-20 11:30:00"
    }, {
        "id": 6,
        "user_id": 2,
        "name": "三体",
        "desc": "刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》!关于宇宙最狂野的想象!就是它!征服世界的中国科幻神作!包揽九项世界顶级科幻大奖!出版16个语种，横扫30国读者!奥巴马雷军、马化腾、周鸿柿、潘石屹、扎克伯格.....强推!",
        "price": "89.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
        "orderNum": 1350,
        "time": "2023-11-20 11:30:00"
    }, {
        "name": "历史的棋局22222",
        "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
        "price": "581.00",
        "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
        "orderNum": 992,
        "time": "2023-11-20 11:30:00",
        "user_id": 1,
        "id": 7
    }]
    await mongodb.insertMany('footprint', footprint); // 在这里加上await关键字

    await mongodb.deleteMany('order')
    let order = [{
        "id": "1729012423043584002",
        "user_id": 1,
        "createTime": "2023-11-27 13:41:00",
        "payType": 1,
        "orderState": 2,
        "payLatestTime": "2023-11-27 14:11:00",
        "postFee": 0,
        "payMoney": 29.9,
        "totalMoney": 29.9,
        "totalNum": 1,
        "skus": [{
            "id": "1729012423047778306",
            "spuId": 4026450,
            "name": "三体",
            "quantity": 1,
            "image": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
            "realPay": 29.9,
            "curPrice": 29.9,
            "totalMoney": null
        }],
        "payChannel": 1,
        "countdown": -1,
        "appraise_text": "评价1"
    }, {
        "id": "1728808512831623170",
        "user_id": 1,
        "createTime": "2023-11-27 00:10:44",
        "payType": 1,
        "orderState": 1,
        "payLatestTime": "2023-11-27 00:40:44",
        "postFee": 9,
        "payMoney": 59,
        "totalMoney": 50,
        "totalNum": 30,
        "skus": [{
            "id": "1728808512877760515",
            "spuId": 4026178,
            "name": "三国演义",
            "quantity": 2,
            "image": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
            "realPay": 118,
            "curPrice": 59,
            "totalMoney": null
        }],
        "payChannel": 1,
        "countdown": -1,
        "appraise_text": ""
    }, {
        "id": "1729012423043584005",
        "user_id": 2,
        "createTime": "2023-11-27 13:41:00",
        "payType": 1,
        "orderState": 2,
        "payLatestTime": "2023-11-27 14:11:00",
        "postFee": 0,
        "payMoney": 29.9,
        "totalMoney": 29.9,
        "totalNum": 1,
        "skus": [{
            "id": "1729012423047778306",
            "spuId": 4026450,
            "name": "三体",
            "quantity": 1,
            "image": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
            "realPay": 29.9,
            "curPrice": 29.9,
            "totalMoney": null
        }],
        "payChannel": 1,
        "countdown": -1,
        "appraise_text": "评价1"
    }, {
        "id": "1728808512831623177",
        "user_id": 2,
        "createTime": "2023-11-27 00:10:44",
        "payType": 1,
        "orderState": 1,
        "payLatestTime": "2023-11-27 00:40:44",
        "postFee": 9,
        "payMoney": 59,
        "totalMoney": 50,
        "totalNum": 30,
        "skus": [{
            "id": "1728808512877760515",
            "spuId": 4026178,
            "name": "三国演义",
            "quantity": 2,
            "image": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
            "realPay": 118,
            "curPrice": 59,
            "totalMoney": null
        }],
        "payChannel": 1,
        "countdown": -1,
        "appraise_text": ""
    }]
    await mongodb.insertMany('order', order); // 在这里加上await关键字

    await mongodb.deleteMany('books')
    let books = [
        {
            "id": 1,
            "name": "历史的棋局",
            "desc": "历史如棋谱，时代变了，那些历史的棋局还能教会我们什么? 刘邦开国后大杀功臣?",
            "price": "581.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/51/cpplatform_1dg3xph2pagiwzkb1tauzy/t6_cpplatform_1dg3xph2pagiwzkb1tauzy1700796621.jpg",
            "orderNum": 992,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 3,
            "name": "活着",
            "desc": "同名电影《活着》由张艺谋执导，葛优、巩俐两大影帝影后主演1994年该片在第47届戛纳电影节上斩获评委会大奖，最佳男演员奖同时还荣获了英国电影学院奖最佳外语片等重要奖项。",
            "price": "125.00",
            "picture": "https://wfqqreader-1252317822.image.myqcloud.com/cover/464/834464/t6_834464.jpg",
            "orderNum": 3071,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 4,
            "name": "三国演义",
            "desc": "古典小说《三国演义》从汉灵帝黄巾起义写起，到西晋三国统一为止，描写了九十余年的重大历史事件及历史人物的活动，展示了三国兴亡的历史画卷，形象地再现了这一风云变幻的历史时代，生动地揭示了统治集团内部尔虞我诈、争权夺利的关系。",
            "price": "89.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/20/yuewen_29855984/t6_yuewen_298559841676969263.jpg",
            "orderNum": 1300,
            "time": "2023-11-20 11:30:00"
        },
        {
            "id": 5,
            "name": "三体",
            "desc": "刘慈欣经典科幻代表作 每个人的书架上都该有套《三体》!关于宇宙最狂野的想象!就是它!征服世界的中国科幻神作!包揽九项世界顶级科幻大奖!出版16个语种，横扫30国读者!奥巴马雷军、马化腾、周鸿柿、潘石屹、扎克伯格.....强推!",
            "price": "89.00",
            "picture": "https://cdn.weread.qq.com/weread/cover/80/yuewen_695233/t6_yuewen_6952331677562148.jpg",
            "orderNum": 1350,
            "time": "2023-11-20 11:30:00"
        }
    ]
    await mongodb.insertMany('books', books); // 在这里加上await关键字

    res.send({
        "code": 200,
        "msg": "操作成功",
        "result": ""
    })
});

module.exports = router;
