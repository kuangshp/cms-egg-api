### 一、`cms-egg-api`介绍

`cms-egg-api`项目仅仅是使用`eggjs`+`mysql`搭建一套基础的后台管理系统平台的`API`的种子工程, 前端可以使用`vue`或者`react`进行对接,提供基本功能包括如下:

- 用户管理
- 角色管理
- 资源管理
- 上传附件
- 用户登录
- 图形验证码的生成

- `api`的黑白名单

前端使用`reactjs`的后台管理系统[链接地址](https://github.com/kuangshp/cms-front)。

### 二、使用步骤

- 1、克隆代码

  ```shell
  git clone git@github.com:kuangshp/cms-egg-api.git
  ```

- 2、创建一个数据库
- 3、根据`init.sql`脚本生成基本的数据表或者直接执行`egg_cms.sql`脚本生成带基本数据的数据表
- 4、安装依赖包及运行代码

  ```shell
  npm install
  npm run dev
  ```

- 5、使用`postman`进行模拟用户登录获取`token`(`egg_cms.sql`中会默认生成用户名`admin`,密码:`123456`的账号)
- 6、请求别的接口时候携带`token`进行数据操作

### 三、生产环境的部署

- 1、直接部署

  ```shell
  npm run start
  ```

- 2、停止项目

  ```shell
  npm run stop
  ```

更多信息请参考[eggjs](https://eggjs.org)
