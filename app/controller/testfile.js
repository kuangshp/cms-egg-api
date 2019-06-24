'use strict';
const BaseController = require('./base');

class TestFileController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = '';
  }

  async create() {
    const { url, fields } = await this.uploadFile('user');
    console.log('-----------上传文件 start--------------');
    console.log(url);
    console.log('-----------上传文件 end--------------');
    this.success(fields);
  }
}

module.exports = TestFileController;
