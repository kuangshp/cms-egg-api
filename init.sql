-- 创建用户表
CREATE TABLE `user`(
	id int(11) PRIMARY KEY auto_increment COMMENT '主键id',
	uuid VARCHAR(150) UNIQUE NOT NULL COMMENT 'uuid主键',
	name VARCHAR(100) UNIQUE NOT NULL COMMENT '姓名',
	password VARCHAR(255) NOT NULL COMMENT '密码',
	email VARCHAR(100) COMMENT '邮箱',
	mobile VARCHAR(11) COMMENT '手机号码',
	gender TINYINT DEFAULT 0 COMMENT '性别',
	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	update_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
)

-- 创建角色表
CREATE TABLE `role`(
	id int(11) PRIMARY KEY auto_increment comment '主键id',
	name varchar(10) UNIQUE not null comment '角色名称',
	create_at timestamp default current_timestamp comment '创建时间',
	update_at timestamp on update current_timestamp default current_timestamp comment '更新时间'
)

-- 创建用户与角色的关联表
create table `role_user`(
	role_id int(11) comment '角色id',
	user_id int(11) comment '用户id',
	PRIMARY key(role_id, user_id)
)

-- 创建资源表
create table `resource`(
	id int(11) primary key auto_increment comment '主键id',
	uuid VARCHAR(150) UNIQUE NOT NULL COMMENT 'uuid主键',
	name VARCHAR(100) UNIQUE NOT NULL COMMENT '资源名称',
	parent_id int(11) not null default 0 comment '父资源id',
	create_at timestamp default current_timestamp comment '创建时间',
	update_at timestamp on update current_timestamp default current_timestamp comment '更新时间'
)

-- 创建资源和角色的关联表
create table `role_resource`(
	role_id int(11) comment '角色id',
	resource_id int(11) comment '资源id',
	primary key(role_id, resource_id)
)