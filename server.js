// var http = require('http');

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');
var express = require('express');
var mysql = require('mysql');

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var nodeDBUtil = require('./nodeDBUtil')
var ndb = new nodeDBUtil();
var db_host = '127.0.0.1'
var db_user = 'root'
var db_pass = 'root'
var db_db = 'wifiSign'



var app = express();
app.use(express.static('js'));

app.get('/basic.html', function (req, res) {
   res.sendFile( __dirname + "/" + "/basic.html" );
})

app.get('/userinfo.html', function (req, res) {
  res.sendFile( __dirname + "/" + "/userinfo.html" );
})

// 获取用户注册信息列表
app.post('/get_user', function (req, res) {
  console.log('--------------------------get user----------------------------'); 
  var connection = ndb.getConnect(db_host,db_user,db_pass,db_db);
  ndb.connectDB(connection);
  var  sql = 'select id,name,mac_addr,sign_time from user_info';
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
  //  console.log('--------------------------SELECT----------------------------'); 
   res.send(JSON.parse(JSON.stringify(result)));
  });
  ndb.close(connection);
})

// 保存变更添加用户信息
app.post('/save_user', urlencodedParser,function (req, res) {
  console.log('--------------------------save user----------------------------'); 
  var connection = ndb.getConnect(db_host,db_user,db_pass,db_db);
  ndb.connectDB(connection);
  console.log(req.body);
  var  name = req.body.name;
  var  mac_addr = req.body.mac_addr;
  console.log('name:'+name+'\n'+'mac_addr:'+mac_addr);
  var  addSql = 'INSERT INTO user_info (name,mac_addr) VALUES (?,?)';
  var  addSqlParams = [name,mac_addr];
  //增
  connection.query(addSql,addSqlParams,function (err, result) {
          if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
          }        
  
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:',result); 
  });
  ndb.close(connection);
})

// 删除用户
app.post('/destroy_user', urlencodedParser,function (req, res) {
  console.log('--------------------------destroy user----------------------------'); 
  var connection = ndb.getConnect(db_host,db_user,db_pass,db_db);
  ndb.connectDB(connection);
  console.log(req.body);
  var  id = req.body.id;
  var  delSql = 'delete from user_info where id = ?';
  var  delSqlParams = [id];
  connection.query(delSql,delSqlParams,function (err, result) {
    if(err){
    console.log('[INSERT ERROR] - ',err.message);
    return;
    }        

  // console.log('--------------------------INSERT----------------------------');      
  console.log('DELETE ID:',result); 
  });
  
  ndb.close(connection);
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  var response = {
    "success":true
  };
  console.log(response);
  res.json('['+JSON.stringify(response)+']');
  // res.json(JSON.parse(JSON.stringify("{'success':true}")));
})

// 获取打卡签到用户信息列表
app.get('/userSignInfo',function(req,res) {
  var connection = ndb.getConnect(db_host,db_user,db_pass,db_db);
  ndb.connectDB(connection);
  var  sql = 'select date_format(con_date,"%Y-%m-%d") as con_date,name,a.mac_addr,start_time,end_time,work_time from (select substring(con_time,1,10) as con_date,mac_addr,min(DATE_FORMAT(con_time,"%Y-%m-%d %H:%i:%s")) as start_time,max(DATE_FORMAT(con_time,"%Y-%m-%d %H:%i:%s")) as end_time,timestampdiff(minute,min(con_time),max(con_time)) as work_time from user_connect_info where substring(con_time,1,10) = current_date() or 1=1 group by con_date,mac_addr) a left join user_info b on a.mac_addr = b.mac_addr where name <> "" order by con_date,work_time desc';
  // var result = ndb.query(connection,sql);
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
  //  console.log('--------------------------SELECT----------------------------'); 
   console.log(JSON.parse(JSON.stringify(result)))
   res.send(JSON.parse(JSON.stringify(result)));
  });
  ndb.close(connection);
})

app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})