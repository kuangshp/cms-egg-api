'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  // 配置mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 开始数据校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 配置需要跨域请求的
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
