const express = require('express');
const router = express.Router();
const mongodb = require("../db/mongodb");
router.post('/books', async (req, res) => {
    console.log(req.body);
    res.send({
        "code": "1",
        "msg": "操作成功",
        "result": [
            {
                "id": "4023100",
                "name": "办公家用Mini健身磁控车",
                "desc": "原创设计，小巧精致，安装便捷，收纳方便",
                "price": "581.00",
                "picture": "https://yanxuan-item.nosdn.127.net/8250d307ea586c1a1d1430023d6f0ce6.jpg",
                "orderNum": 1017
            },
            {
                "id": "4023115",
                "name": "双镜四季骑行半盔Pro（摩托车可用）",
                "desc": "3C认证，双镜片设计，进口材质耐撞抗摔",
                "price": "198.00",
                "picture": "https://yanxuan-item.nosdn.127.net/7498e93c9744cce5dad8b556befe8c10.png",
                "orderNum": 945
            },
            {
                "id": "4023114",
                "name": "KJE金属色系轻量电动车骑行盔男女通用",
                "desc": "3C认证，进口材料，安全出行",
                "price": "120.00",
                "picture": "https://yanxuan-item.nosdn.127.net/8f3a3b7dc6ca874f934b15af31417f61.png",
                "orderNum": 5235
            },
            {
                "id": "4026116",
                "name": "探险者黑胶防晒防雨遮阳伞户外钓鱼伞",
                "desc": "防雨遮阳隔绝紫外线",
                "price": "169.00",
                "picture": "https://yanxuan-item.nosdn.127.net/66090c5de391e43e4516601e14870842.jpg",
                "orderNum": 2549
            }
        ]
    })
});

module.exports = router;
