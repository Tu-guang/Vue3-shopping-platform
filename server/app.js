const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const multer = require("multer");
const Jwt = require("./util/getJwt")
const login = require("./router/login")
const register = require("./router/register")
const address = require("./router/address")
const uploads = require("./router/upload")
const user = require("./router/user")
const footprint = require("./router/footprint")
const favorites = require("./router/favorites")
const order = require("./router/order")
const books = require("./router/books")
//挂载参数处理的中间件
//extended:false 表示使用系统模块querystring来处理 将字符串转化为对象
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);
app.use(bodyparser.json());
//挂载内置中间件处理静态文件
app.use(express.static("public"));
// express框架解决跨域问题的代码，注意该代码要放在 app.use(router); 之前
//设置跨域请求
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization,Token,Accept, X-Requested-With , authorization,token"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    console.log(1)
    next();
});

var filestorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        // cb(null, "[maues]-" + file.originalname);
        cb(null, file.originalname);
    },
    fileFilter(req, file, cb) {
        // 解决中文名乱码的问题
        file.originalname = Buffer.from(req.file.originalname, "latin1").toString(
            "utf8"
        );
    },
});

var upload = multer({
    storage: filestorageEngine,
});


app.use((req, res, next) => {
    const url = req._parsedUrl.pathname; // 获取当前访问的api地址
    console.log(url);
    // 不需要进行验证的api，白名单
    var urlArr = ["/login", "/upload","/register"];
    if (urlArr.indexOf(url) >= 0) {
        next();
        return false;
    }
    // next();
    let token = req.headers["authorization"];
    if (token !== undefined) {
        // console.log(token.replace("Bearer ", ""))
        token = token.replace("Bearer ", "")
    }
    Jwt.getToken(token)
        .then((data) => {
            // 解析正确
            res.data = data;
            req.body.user_id  = data.userId
            next();
        })
        .catch((error) => {
            console.log(error);
            res.send({err: 401, msg: "token过期"});
        });
});

app.get("/", function (req, res) {
    res.send("Hello World");
});
app.use("/", login);
app.use("/", register);
app.use("/", address);
app.use("/", upload.single("file"), uploads);
app.use("/", user);
app.use("/", footprint);
app.use("/", favorites);
app.use("/", order);
app.use("/", books);


let server = app.listen(8081, function () {
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://localhost:%s", port);
});
