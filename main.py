# -*- coding: UTF-8 -*-
import urllib
from dbUtil import dbUtil
import urllib.request
import base64
import re
import time
import os
import _thread
import webbrowser
import configparser

# 定义启动服务方法
def cmd ():
    print ('服务端启动:node server.js......')
    os.system('node server.js')

# 加载配置文件
config = configparser.ConfigParser()
config.read('config.ini', encoding='utf-8')
ip = config.get('route', 'ip')
user = config.get('route', 'user')
password = config.get('route', 'password')

if __name__ == '__main__':
    # 启动服务线程
    try:
        _thread.start_new_thread(cmd, () )
    except:
        print ('Error: unable to start thread')
    
    # 打开浏览器
    webbrowser.open("http://localhost:8081/basic.html")

    while (True):
        # # 路由器IP
        # ip = '192.168.1.198'
        # # 登录的用户名和密码
        # user = 'admin'
        # password = '1q2w3e4r'
        
        up = (user+':'+password).encode()
        # 请求地址
        url = 'http://' + ip + '/userRpm/WlanStationRpm.htm?Page=1'
        auth = 'Basic ' + base64.b64encode(up).decode()
        heads = { 'Referer' : 'http://' + ip + '/userRpm/WlanStationRpm.htm?Page=1',
                'Authorization' : auth
        }
        
        try:
            # 发送请求
            request = urllib.request.Request(url, None, heads)
            response = urllib.request.urlopen(request)
            result = response.read().decode('gbk')
    
            print('---------------------------------------------------------')

            # 正则解析
            a = re.findall('hostList = new Array(.*?);',result,re.S|re.I|re.M)
            # print(a)
            b = re.findall(r'".*?"',a[0],re.S|re.I|re.M)
            print(b)

            
            db = dbUtil.getdbConnect()
            cur = db.cursor()  
            # mac_addr = '00-FF-67-0F-7C-98'
            try:  
                for n in b :
                    # print(n)
                    mac_addr = n.replace('"','')
                    sqlInst = "INSERT INTO user_connect_info(mac_addr) \
                    VALUES ('%s')" % \
                    (mac_addr)
                    cur.execute(sqlInst)  
                #提交  
                db.commit()  
            except Exception as e:  
                #错误回滚  
                db.rollback()   
            finally:  
                db.close()
                time.sleep(30)
        except:
             print ('Error: unable to connect to route......')

# 测试
# dbn = dbUtil.getdbConnect()
# sqlStr = "select * from user_connect_info"
# try:
#     results = dbUtil.selectWithSql(dbn,sqlStr)
#     for row in results : 
#         mac_addr = row[0]
#         con_time = row[1]
#         print(mac_addr,con_time)
# except Exception as e:
#     raise e
# finally:  
#     dbUtil.close(dbn)