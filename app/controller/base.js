// eslint-disable-next-line strict
const CoreController = require('../core/coreController');

class BaseController extends CoreController {
  // 查询全部的数据
  async index() {
    const { ctx, service } = this;
    const { pageNum, pageSize, ...where } = ctx.query;
    const resultList = await service[this.entity].list(
      isNaN(pageNum) ? 1 : parseInt(pageNum),
      isNaN(pageSize) ? this.config.pageSize : parseInt(pageSize),
      where
    );
    this.success(resultList);
  }

  // 根据id查询数据
  async show() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const result = await service[this.entity].show(id);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 根据id来编辑
  async update() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const requestDate = ctx.request.body;
      requestDate.id = id;
      const result = await service[this.entity].update(requestDate);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 创建数据
  async create() {
    const { ctx, service } = this;
    try {
      const requestDate = ctx.request.body;
      const result = await service[this.entity].create(requestDate);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 删除数据
  async destroy() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      let ids = ctx.request.body;
      if (!ids) {
        ids = [ id ];
      }
      const result = await service[this.entity].destroy(ids);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }
}

module.exports = BaseController;
