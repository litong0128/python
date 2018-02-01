--用户连接信息表
create database wifiSign;
use wifiSign;
drop table user_connect_info;
create table IF NOT EXISTS user_connect_info (
    mac_addr varchar(50),
    con_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-92');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-93');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-94');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-95');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-96');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-97');
select * from `user_connect_info`;drop table user_connect_info;
create table IF NOT EXISTS user_connect_info (
    mac_addr varchar(50),
    con_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-92');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-93');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-94');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-95');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-96');
insert into user_connect_info (mac_addr) values ('00-FF-67-0F-7C-97');
select * from `user_connect_info`;
-- 用户信息表
drop table user_info;
create table IF NOT EXISTS user_info (
    id INT(20) not null AUTO_INCREMENT,
    mac_addr varchar(50),
    name varchar(256),
    sign_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into user_info (mac_addr,name) values ('00-FF-67-0F-7C-97','冯二傻');
insert into user_info (mac_addr,name) values ('00-FF-67-0F-7C-92','冯大傻');

select * from `user_info`;

--工作时间统计
select name,a.mac_addr,start_time,end_time,work_time
from (
select substring(con_time,1,10) as con_date,mac_addr,min(con_time) as start_time,max(con_time) as end_time,timestampdiff(second,min(con_time),max(con_time)) as work_time 
from user_connect_info 
where substring(con_time,1,10) = current_date() or 1=1
group by con_date,mac_addr
) a left join user_info b on a.mac_addr = b.mac_addr;


select date_format(con_date,'%Y-%m-%d') as con_date,name,a.mac_addr,start_time,end_time,work_time 
from (
    select substring(con_time,1,10) as con_date,mac_addr,min(DATE_FORMAT(con_time,'%Y-%m-%d %H:%i:%s')) as start_time,max(DATE_FORMAT(con_time,'%Y-%m-%d %H:%i:%s')) as end_time,timestampdiff(minute,min(con_time),max(con_time)) as work_time 
    from user_connect_info 
    where substring(con_time,1,10) = current_date() or 1=1 
    group by con_date,mac_addr
    ) a left join user_info b on a.mac_addr = b.mac_addr 
where name <> "" order by con_date,work_time desc;