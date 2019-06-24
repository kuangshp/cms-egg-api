/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561344901255_592';

  // 使用中间件
  config.middleware = [ 'auth' ];

  config.auth = {
    // tslint:disable-next-line:array-bracket-spacing
    authUrlList: [ '/api/v1/captcha', '/api/v1/user/login', '/api/v1/file' ],
  };
  config.baseUrl = '/api/v1';
  // 对jsonwebtoken加盐的字段,随便放值
  config.jwtSecret = 'qwertyuiopasdfghjklzxcvbnm.';
  // 配置默认显示一页多少条数据
  config.pageSize = 10;
  // 配置mysql
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'jianshuihen128',
      database: 'egg_cms',
    },
    // 是否加载到 app 上，默认开启
    // app: true,
    // 是否加载到 agent 上，默认关闭
    // agent: false,
  };

  // 取消csrf校验
  config.security = {
    csrf: false,
    domainWhiteList: [ '*' ],
  };
  // 设置跨域
  config.cors = {
    credentials: true,
  };
  // 配置上传
  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    // tslint:disable-next-line:array-bracket-spacing
    fileExtensions: [ '.xls', '.txt' ], // 扩展几种上传的文件格式
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
