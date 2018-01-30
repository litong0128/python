import pymysql

# 定义变量
host = "127.0.0.1"
user = "root"
password = "root"
db = "wifiSign"
port = 3306
# 打开数据库连接  

db = pymysql.connect(host=host,user=user,  
    password=password,db=db,port=port)  

# 使用cursor()方法获取操作游标  
cur = db.cursor()
  
#1.查询操作
# 编写sql 查询语句  user 对应我的表名  
sql = "select * from user_connect_info"  
try:
    cur.execute(sql)    #执行sql语句
    results = cur.fetchall()    #获取查询的所有记录  
    print("mac_addr","con_time")  
    #遍历结果  
    for row in results : 
        mac_addr = row[0]
        con_time = row[1]
        print(mac_addr,con_time)
except Exception as e:
    raise e
finally:  
    db.close()  #关闭连接

# 2.插入操作 
# 打开数据库连接  
db= pymysql.connect(host="127.0.0.1",user="root",  
    password="root",db="wifiSign",port=3306)  
# 使用cursor()方法获取操作游标  
cur = db.cursor()  
  
sql_insert ="""insert into user_connect_info(mac_addr) values('00-FF-67-0F-7C-91')"""  
  
try:  
    cur.execute(sql_insert)  
    #提交  
    db.commit()  
except Exception as e:  
    #错误回滚  
    db.rollback()   
finally:  
    db.close()  

# 更新操作
#打开数据库连接  
db= pymysql.connect(host="127.0.0.1",user="root",  
    password="root",db="wifiSign",port=3306)
  
# 使用cursor()方法获取操作游标  
cur = db.cursor()  
  
sql_update ="update user_connect_info set mac_addr = '%s' where con_time = %s"  
  
try:  
    cur.execute(sql_update % ("00-FF-67-0F-7C-97","2018-01-23 11:48:50"))  #像sql语句传递参数  
    #提交  
    db.commit()  
except Exception as e:  
    #错误回滚  
    db.rollback()   
finally:  
    db.close()  


#4.删除操作  
db= pymysql.connect(host="127.0.0.1",user="root",  
    password="root",db="wifiSign",port=3306)
  
# 使用cursor()方法获取操作游标  
cur = db.cursor()  
  
sql_delete ="delete from user_connect_info where id = %s"  
  
try:  
    cur.execute(sql_delete % ("00-FF-67-0F-7C-98"))  #像sql语句传递参数  
    #提交  
    db.commit()  
except Exception as e:  
    #错误回滚  
    db.rollback()   
finally:  
    db.close()  