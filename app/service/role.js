'use strict';
const BaseService = require('./base');
class RoleService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.entry = 'role';
  }

  // 获取资源菜单
  async getResource() {
    try {
      const { app } = this;
      // 根据当前用户查询到资源表中对应的资源
      const id = this.ctx.session.user.id;
      const sql = `SELECT resource.* from user INNER JOIN role_user on user.id = role_user.user_id
      INNER JOIN role on role_user.role_id=role.id INNER JOIN role_resource on role.id = role_resource.role_id
      INNER JOIN resource on role_resource.resource_id = resource.id WHERE user.id = ?`;
      const resources = await app.mysql.query(sql, [ id ]);
      /** ******************************格式化资源菜单生生成树结构 start********************************/
      const formatobj = resources.reduce((pre, cur) => {
        return { ...pre, [cur.id]: cur };
      }, {});
      const rootMenus = resources.reduce((arr, cur) => {
        const parentId = cur.parent_id;
        const parent = formatobj[parentId];
        if (parent) {
          parent.children
            ? parent.children.push(cur)
            : (parent.children = [ cur ]);
        } else {
          arr.push(cur);
        }
        return arr;
      }, []);
      return rootMenus;
      /** ******************************格式化资源菜单生生成树结构 end********************************/
    } catch (e) {
      throw '查询失败';
    }
  }

  // 设置角色资源
  async setResource({ roleId, resourceList }) {
    const { app } = this;
    // 开启事物保护数据不要删除了,没添加进去
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('delete from role_resource where role_id=?', [ roleId ]);
      if (resourceList.length) {
        for (const item of resourceList) {
          await conn.insert('role_resource', {
            role_id: roleId,
            resource_id: item,
          });
        }
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  }

  // 查询用户,返回用户的角色及资源
  async getUser() {
    try {
      const { app } = this;
      return app.mysql.select('user');
    } catch (e) {
      throw e;
    }
  }

  async setUser({ roleId, userList }) {
    const { app } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('delete from role_user where role_id=?', [ roleId ]);
      for (const userId of userList) {
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: userId,
        });
      }
      conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  }
}

module.exports = RoleService;
