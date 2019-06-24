// eslint-disable-next-line strict
const BaseController = require('./base');
const { v4 } = require('uuid');
// 密码加密的模块
const NodeAuth = require('node-auth0');
// 生成svg验证码的模块
const svgCaptcha = require('svg-captcha');
// 引入jsonwebtoken对登录模块校验的
const { sign } = require('jsonwebtoken');

class UserController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.entity = 'user';
    this.nodeAuth = new NodeAuth.default(8, 10, true);
  }

  /**
   * 重写创建的方法
   */
  async create() {
    const { ctx, service } = this;
    let requestDate = ctx.request.body;
    try {
      // 数据校验
      const rule = {
        name: { type: 'string', trim: true, max: 100, min: 1 },
        password: { type: 'string', trim: true },
        email: { type: 'string', required: false },
        mobile: { type: 'string', required: false },
        gender: { type: 'number', required: false },
      };
      ctx.validate(rule);
      // 使用密码加密模块加密
      const { password } = requestDate;
      requestDate = {
        ...requestDate,
        password: this.nodeAuth.makePassword(password), // 密码加密
        uuid: v4(), // 使用uuid
      };
      const result = await service[this.entity].create(requestDate);
      this.success(result);
    } catch (e) {
      this.error(e);
    }
  }

  // 用户登录
  async login() {
    const { ctx, service } = this;
    try {
      const body = ctx.request.body;
      // 用户可能用name、email、手机号码登录
      const rule = {
        userName: { type: 'string', trim: true },
        password: { type: 'string', trim: true },
        captcha: { type: 'string', trim: true },
      };
      ctx.validate(rule);
      // 对验证码校验
      const { code, message } = await this.checkCaptcha();
      if (code === 1) {
        throw message;
      }
      /** ******************************处理用户输入用户名、邮箱、手机号码 账号 start********************************/
      const { userName } = body;
      if (ctx.helper.isEmail.test(userName)) {
        body.email = userName;
      } else if (ctx.helper.isMobile.test(userName)) {
        body.mobile = userName;
      } else {
        body.name = userName;
      }
      delete body.userName;
      /** ******************************处理用户输入用户名、邮箱、手机号码 账号 end********************************/
      let result = await service.user.login(body);
      /** ******************************对登录用户签名生成token并存储到session上 start********************************/
      const token = sign(
        JSON.parse(JSON.stringify(result)),
        this.config.jwtSecret,
        {
          expiresIn: 24 * 60 * 60 * 1000, // 设置过期时间
        }
      );
      ctx.session.token = token;
      result = {
        ...result,
        token,
      };
      /** ******************************对登录用户签名生成token并存储到session上 end********************************/
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }
  // 重写更新的方法
  async update() {
    const { ctx, service } = this;
    try {
      const { id } = ctx.params;
      const requestDate = ctx.request.body;
      requestDate.id = id;
      if (requestDate.password) {
        requestDate.password = this.nodeAuth.makePassword(requestDate.password);
      }
      const rule = {
        id: { type: 'string' },
      };
      ctx.validate(rule);
      const result = await service[this.entity].update(requestDate);
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 生成验证码的
  async captcha() {
    const { ctx } = this;
    try {
      const { data, text } = svgCaptcha.create({
        ignoreChars: '0o1i',
        noise: 10,
        color: true,
        background: '#e5e5e5',
      });
      console.log('-----------当前验证码 start--------------');
      console.log(text);
      console.log('-----------当前验证码 end--------------');
      // 将用户的captcha存到session中
      ctx.session.captcha = text.toLowerCase();
      ctx.set('Content-Type', 'image/svg+xml');
      ctx.body = data;
    } catch (e) {
      ctx.logger.error(e);
      this.error(e);
    }
  }

  // 校验验证码
  async checkCaptcha() {
    const { ctx } = this;
    const errorHandler = {
      code: 1,
      message: '验证码错误',
    };
    try {
      const { captcha } = ctx.request.body;
      if (captcha.toLowerCase() === ctx.session.captcha) {
        return {
          code: 0,
          message: '验证码正确',
        };
      }
      return errorHandler;
    } catch (e) {
      ctx.logger.error(e);
      return errorHandler;
    }
  }
}

module.exports = UserController;
