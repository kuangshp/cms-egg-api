/*
 * @Description:用户的服务类
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-06-24 11:55:34
 * @LastEditors: 水痕
 * @LastEditTime: 2019-06-24 12:17:41
 */
'use strict';
const BaseService = require('./base');
const NodeAuth = require('node-auth0');

class UserService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.entry = 'user';
    this.nodeAuth = new NodeAuth.default(8, 10, true);
  }

  // 用户登录
  async login(body) {
    try {
      const { app } = this;
      const { name, password, email, mobile } = body;
      let sql = 'select * from user where';
      let _name = '';
      if (name) {
        sql += ' name= ? limit 1';
        _name = name;
      } else if (email) {
        sql += ' email = ? limit 1';
        _name = email;
      } else if (mobile) {
        sql += ' mobile = ? limit 1';
        _name = mobile;
      }
      // tslint:disable-next-line:array-bracket-spacing
      const user = await app.mysql.query(sql, [ _name ]);
      if (
        user &&
        user.length &&
        this.nodeAuth.checkPassword(password, user[0].password)
      ) {
        delete user[0].password;
        return user[0];
      }
      throw '账号或者密码错误';
    } catch (e) {
      throw e;
    }
  }
  // 根据用户id查询出用户的角色
  async show(id) {
    try {
      const { app } = this;
      let sql = `SELECT user.*, role.name role_name, role.id role_id from user left join role_user on user.id = 
        role_user.user_id left join role on role_user.role_id = role.id where`;
      if (!parseInt(id.toString())) {
        sql += ' user.uuid= ?';
      } else {
        sql += ' user.id= ?';
      }
      const result = await app.mysql.query(sql, [ id ]);
      const role = [];
      return result.reduce((pre, cur) => {
        if (cur.role_name && cur.role_id) {
          role.push({ role_name: cur.role_name, role_id: cur.role_id });
        }
        delete cur.role_id;
        delete cur.role_name;
        delete cur.password;
        cur.role = role;
        return { ...pre, userInfo: cur };
      }, {});
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UserService;
