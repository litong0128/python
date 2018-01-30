import pymysql
class dbUtil:
    # 定义变量
    def getdbConnect():
        host = "127.0.0.1"
        user = "root"
        password = "root"
        database = "wifiSign"
        port = 3306
        dbc = pymysql.connect(host=host,user=user,password=password,db=database,port=port) 
        return dbc

    def selectWithSql(db,sqlStr):
        cur = db.cursor()
        cur.execute(sqlStr)    #执行sql语句
        results = cur.fetchall()    #获取查询的所有记录
        return results

    def close(db):
        db.close()

    # 测试
    dbn = getdbConnect()
    sqlStr = "select * from user_connect_info"
    try:
        results = selectWithSql(dbn,sqlStr)
        for row in results : 
            mac_addr = row[0]
            con_time = row[1]
            print(mac_addr,con_time)
    except Exception as e:
        raise e
    finally:  
        close(dbn)