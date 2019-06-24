'use strict';
const BaseController = require('./base');

class RoleUserController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'roleUser';
  }
}

module.exports = RoleUserController;
