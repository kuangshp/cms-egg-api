/*
 * @Description: 用户授权登录拦截的中间件
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-06-18 15:09:35
 * @LastEditors: 水痕
 * @LastEditTime: 2019-06-24 13:48:06
 */
'use strict';
const { verify } = require('jsonwebtoken');
/**
 * 定义验证token的方法
 * @param token 用户传递过来的token
 * @param secret 配置文件中的盐
 */
const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, payload) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    });
  });
};

// 方式一,将不需要登录访问的接口全部写在authUrlList中
module.exports = (options, app) => {
  return async (ctx, next) => {
    // 获取配置菜单里面的运行的白名单菜单
    const authUrlList = options.authUrlList;
    if (!authUrlList.includes(ctx.url)) {
      // 从请求头中获取token、获取从请求体中、或者从url地址中获取
      const token =
        ctx.get('token') ||
        ctx.request.body.token ||
        (ctx.originalUrl &&
          ctx.originalUrl.match(/.*?token=(.*)/) &&
          ctx.originalUrl.match(/.*?token=(.*)/).length &&
          ctx.originalUrl.match(/.*?token=(.*)/)[1]);
      // 删除请求体中的token(后面不需要该字段)
      delete ctx.request.body.token;
      if (token) {
        try {
          const user = await verifyToken(token, app.config.jwtSecret);
          ctx.session.user = user;
          await next();
        } catch (e) {
          ctx.status = 401;
          ctx.body = {
            code: 1,
            message: 'token验证失败',
          };
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 1,
          message: '没有权限, 请先登录',
        };
      }
    } else {
      await next();
    }
  };
};
