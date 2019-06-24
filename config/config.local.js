'use strict';

module.exports = () => {
  const config = (exports = {});
  // 配置mysql
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'jianshuihen128',
      database: 'egg_cms',
    },
  };
  return config;
};
