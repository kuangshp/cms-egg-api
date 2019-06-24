/*
 * @Description: 封装基础的服务层
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-06-24 11:08:22
 * @LastEditors: 水痕
 * @LastEditTime: 2019-06-24 11:15:16
 */
'use strict';
const CoreService = require('../core/coreService');

class BaseService extends CoreService {
  async list(pageNum, pageSize, where) {
    const { app } = this;
    const data = await app.mysql.select(this.entry, {
      where,
      order: [[ 'update_at', 'desc' ], [ 'create_at', 'desc' ]],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    const total = await app.mysql.count(this.entry, where);
    return {
      data,
      total,
    };
  }

  async show(id) {
    const { app } = this;
    const result = await app.mysql.get(this.entry, {
      id,
    });
    return result;
  }

  async create(model) {
    try {
      const { app } = this;
      const { affectedRows, insertId } = await app.mysql.insert(
        this.entry,
        model
      );
      if (affectedRows) {
        if (insertId) {
          const result = await this.show(insertId);
          delete result.password;
          return result;
        }
        return {};
      }
      throw '插入数据失败';
    } catch (e) {
      throw e;
    }
  }

  async update(model) {
    try {
      const { app } = this;
      const { affectedRows } = await app.mysql.update(this.entry, model);
      if (affectedRows) {
        return await this.show(model.id);
      }
      throw '修改数据失败';
    } catch (e) {
      throw '修改数据失败';
    }
  }

  async destroy(id) {
    const { app } = this;
    const { affectedRows } = await app.mysql.delete(this.entry, {
      id,
    });
    if (affectedRows) {
      return '删除成功';
    }
    throw '删除失败';
  }
}

module.exports = BaseService;
