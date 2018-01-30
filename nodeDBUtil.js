var mysql = require('mysql');

function nodeDBUtil() {
    // 获取连接对象
    this.getConnect = function(host,user,password,database) {
        var connection = mysql.createConnection({
            host     : host,
            user     : user,
            password : password,
            database : database
          });
        return connection;
    }

    // 连接数据库
    this.connectDB = function(connection) {
        connection.connect();
    }

    // 查询
    this.query = function(connection,sql) {
        var resu;
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            resu ='123';
           console.log('--------------------------SELECT----------------------------');
        //    console.log(result);
           console.log(JSON.parse(JSON.stringify(result)));
           console.log('------------------------------------------------------------\n\n');  
          
        });
        console.log(resu);
        return resu;
        
    }   

    // 关闭连接
    this.close = function(connection) {
        connection.end();
    }
      
}
module.exports = nodeDBUtil;
