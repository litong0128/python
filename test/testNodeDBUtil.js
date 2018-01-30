var nodeDBUtil = require('../nodeDBUtil')

ndb = new nodeDBUtil();
var connection = ndb.getConnect('127.0.0.1','root','root','wifiSign');
ndb.connectDB(connection);
var  sql = 'select name,a.mac_addr,start_time,end_time,work_time from (select substring(con_time,1,10) as con_date,mac_addr,min(con_time) as start_time,max(con_time) as end_time,timestampdiff(second,min(con_time),max(con_time)) as work_time from user_connect_info where substring(con_time,1,10) = current_date() or 1=1 group by con_date,mac_addr) a left join user_info b on a.mac_addr = b.mac_addr';
ndb.query(connection,sql);
ndb.close(connection);