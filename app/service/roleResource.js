'use strict';
const BaseService = require('./base');

class RoleResourceService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.entry = 'role_resource';
  }
}

module.exports = RoleResourceService;
