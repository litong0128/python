import urllib
from dbUtil import dbUtil


# 定义路由地址
route_ip = '192.168.0.1'
route_user = 'admin'
route_pass = 'admin'



# 测试
dbn = dbUtil.getdbConnect()
sqlStr = "select * from user_connect_info"
try:
    results = dbUtil.selectWithSql(dbn,sqlStr)
    for row in results : 
        mac_addr = row[0]
        con_time = row[1]
        print(mac_addr,con_time)
except Exception as e:
    raise e
finally:  
    dbUtil.close(dbn)