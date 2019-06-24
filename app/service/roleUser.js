'use strict';
const BaseService = require('./base');

class RoleUserService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.entry = 'role_user';
  }
}

module.exports = RoleUserService;
