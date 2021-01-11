// 引入mysql
const mysql = require('mysql');

// 创建连接对象
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test'
})

// 执行连接
connection.connect();
console.log("数据库连接成功");

// 暴露模块

module.exports = connection;
