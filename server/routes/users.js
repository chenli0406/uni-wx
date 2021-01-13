var express = require('express');
var router = express.Router();

//引入数据库模板
const connection = require("./js/conn")
// 引入jwt
const jwt = require('jsonwebtoken')

// 设置统一响应头
router.all('*', (req, res, next) => {
  // 解决跨域
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许通过头部信息authorization 携带token  
  next();
})


// 准备一个签名（秘钥）
const secretKey = 'qawsed';
/* 验证token的合法性 */
const expressJwt = require('express-jwt');

// 验证token的合法性
router.use(expressJwt ({
          secret: secretKey,
          algorithms: ['HS256']
}).unless({
       path:['/login/checkLogin'] //除了这个地址，其他的接口需要带上token。
}))

// 路由拦截器
router.use(function (err, req, res, next){
   console.log(err);
  // 如果前端没有token或者错误的token，抛出错误
  if(err.name == "UnauthorizedError") {
    // 响应给前端token 无效的信息
    res.status(401).send("invalid token...");
  }
})

// 首页分页功能
router.get('/getListPage', (req,res) => {
  // 接受前端响应的参数
  let { currentPage, pageSize} = req.query;
  // 查询语句sql
  let sqlStr = `select * from user_list`;
  console.log(sqlStr);
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
    // 计算总条数
    let total = data.length;
    // 计算跳过多少条
    let n = (currentPage - 1)*pageSize;
    // 拼接sql
    sqlStr  += ` limit ${n}, ${pageSize}`;
    console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr,(err,data) => { 
      if(err) throw err;
      //把总条数和页数对应的数据响应给前端
      res.send({ code:0,total,data});
    })
    
  })
})

// 首页banner
router.get('/getBanner', (req,res) => {
  // 查询语句sql
  let sqlStr = `select * from banner_list`;
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})

// nav
router.get('/getNavList', (req,res) => {
  // 查询语句sql
  let sqlStr = `select * from nav_list`;
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})

// tab_list
router.get('/getTabList', (req,res) => {
  // 查询语句sql
  let sqlStr = `select * from tab_list`;
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})

// msg_list
router.get('/getMsgList', (req,res) => {
  // 查询语句sql
  let sqlStr = `select * from msg_list`;
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})

// details_list
router.get('/getDetails', (req,res) => {
   // 接受参数
   let {id} = req.query;
   // 查询语句sql
   let sqlStr = `select * from details_list where id= '${id}'`;
   console.log(sqlStr);
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})

//  添加反馈
router.post("/addFeedback", (req, res) => {
  // 接受前端发来的数据
  let { type, content, imgList } = req.body;
  const sqlStr = `insert into feedback_list(type,content,imgList) values('${type}','${content}','${imgList}')`
  	//执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		//判断受影响大于0 代表成功 否则失败
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				msg: "提交成功"
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				msg: "提交失败"
			})
		}
   })
})

// 分页功能
router.get('/getPresonListPage', (req,res) => {
  // 接受前端响应的参数
  let { currentPage, pageSize} = req.query;
  // 查询语句sql
  let sqlStr = `select * from preson_list`;
  console.log(sqlStr);
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
    // 计算总条数
    let total = data.length;
    // 计算跳过多少条
    let n = (currentPage - 1)*pageSize;
    // 拼接sql
    sqlStr  += ` limit ${n}, ${pageSize}`;
    console.log(sqlStr);
    // 执行sql
    connection.query(sqlStr,(err,data) => { 
      if(err) throw err;
      //把总条数和页数对应的数据响应给前端
      res.send({ code:0,total,data});
    })
    
  })
})

router.get('/getPresonId', (req,res) => {
   // 接受参数
   let {id} = req.query;
   // 查询语句sql
   let sqlStr = `select * from preson_list where id= '${id}'`;
   console.log(sqlStr);
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
      res.send({ code:0,data});
  })
})


// good_list
router.get('/getGoodList', (req,res) => {
  let { currentPage, pageSize} = req.query;
  // 查询语句sql
  let sqlStr = `select * from good_list`;
  //执行sql
  connection.query(sqlStr,(err,data) => {
     if(err) throw err;
     // 计算总条数
     let total = data.length;
     // 计算跳过多少条
     let n = (currentPage - 1)*pageSize;
     // 拼接sql
     sqlStr  += ` limit ${n}, ${pageSize}`;
    // 执行sql
    connection.query(sqlStr,(err,data) => { 
      if(err) throw err;
      //把总条数和页数对应的数据响应给前端
      res.send({ code:0,total,data});
    })
  })
})


// good_list
router.post('/saveGoodList', (req,res) => {
  // 接受参数
  let { id, zan} = req.body;
  // 查询语句sql
  let sqlStr = `update good_list set zan=${zan} where id= '${id}'`;
  //执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		if (data.affectedRows > 0) {
			//响应成功的数据对象给前端
			res.send({
				code: 0,
				msg: "成功",
			})
		} else {
			//响应失败的数据对象给前端
			res.send({
				code: 1,
				msg: "失败"
			})
		}
	})
})

module.exports = router;
