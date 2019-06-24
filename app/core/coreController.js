/*
 * @Description: 核心的控制层
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @Date: 2019-06-24 10:56:37
 * @LastEditors: 水痕
 * @LastEditTime: 2019-06-24 13:20:19
 */
'use strict';
const { Controller } = require('egg');
const fs = require('fs');
const path = require('path');
// 故名思意 异步二进制 写入流
// tslint:disable-next-line:no-var-requires
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

class CoreController extends Controller {
  success(data = {}) {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data,
    };
  }
  error(info) {
    this.ctx.body = {
      code: 1,
      message: 'error',
      info,
    };
  }

  /**
   * 上传文件的通用方法
   * @param category 分类目录
   */
  async uploadFile(category = '') {
    const stream = await this.ctx.getFileStream();
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      (Math.random() * 1000).toString()
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    // 递归创建文件夹
    function mkdirsSync(dirname) {
      if (!fs.existsSync(dirname)) {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      } else {
        return true;
      }
    }
    mkdirsSync(path.join(uplaodBasePath, category, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, category, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      return {
        code: 1,
        message: err,
      };
    }
    return {
      url: path.join('/public/uploads', category, dirname, filename),
      fields: stream.fields,
    };
  }
}

module.exports = CoreController;
