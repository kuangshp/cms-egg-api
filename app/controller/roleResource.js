'use strict';
const BaseController = require('./base');

class RoleResourceController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'roleResource';
  }
}

module.exports = RoleResourceController;
