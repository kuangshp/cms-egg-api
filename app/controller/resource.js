'use strict';
const BaseController = require('./base');
const { v4 } = require('uuid');
class ResourceController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'resource';
  }

  async create() {
    const { ctx, service } = this;
    try {
      const requestDate = ctx.request.body;
      requestDate.uuid = v4();
      const result = await service[this.entity].create(requestDate);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }
}

module.exports = ResourceController;
