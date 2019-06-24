'use strict';
const BaseController = require('./base');

class RoleController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'role';
  }

  // 获取资源
  async getResource() {
    const { ctx, service } = this;
    try {
      const result = await service.role.getResource();
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 设置新的资源
  async setResource() {
    const { ctx, service } = this;
    try {
      const body = ctx.request.body; // { roleId, resourceList }
      await service.role.setResource(body);
      this.success('授权成功');
    } catch (e) {
      this.error(e);
    }
  }

  // 获取全部的用户
  async getUser() {
    try {
      const { service } = this;
      const result = await service.role.getUser();
      this.success(result);
    } catch (e) {
      this.error(e);
    }
  }

  async setUser() {
    try {
      const { ctx, service } = this;
      const body = ctx.request.body;
      await service.role.setUser(body); // {roleId:1,userList:[1,2,3]}
      this.success('授权成功');
    } catch (e) {
      this.error(e);
    }
  }
}

module.exports = RoleController;
