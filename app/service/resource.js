'use strict';
const BaseService = require('./base');

class ResourceService extends BaseService {
  constructor(ctx) {
    super(ctx);
    this.entry = 'resource';
  }
}

module.exports = ResourceService;
