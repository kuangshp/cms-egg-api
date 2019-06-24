'use strict';

module.exports = app => {
  const { router, controller } = app;
  const baseUrl = app.config.baseUrl;
  // 获取用户的接口
  router.resources('user', `${baseUrl}/user`, controller.user);

  // 用户登录(如果需要配置用户注册,请重新写方法,本项目是后台cms系统,只允许创建用户,上面接口里面有)
  router.post(`${baseUrl}/user/login`, controller.user.login);
  // 配置登录的验证码
  router.get(`${baseUrl}/captcha`, controller.user.captcha);

  // 获取角色的接口
  router.resources('role', `${baseUrl}/role`, controller.role);
  // 获取资源的接口
  router.resources('resource', `${baseUrl}/resource`, controller.resource);
  // 获取角色资源
  router.resources(
    'roleResource',
    `${baseUrl}/role_resource`,
    controller.roleResource
  );
  // 获取角色用户
  router.resources('roleUser', `${baseUrl}/role_user`, controller.roleUser);
  // 获取资源
  router.get(`${baseUrl}/roles/get_resource`, controller.role.getResource);
  // 设置角色资源
  router.post(`${baseUrl}/roles/set_resource`, controller.role.setResource);
  // // 获取全部的用户
  router.get(`${baseUrl}/roles/get_user`, controller.role.getUser);
  // // 设置用户角色
  router.post(`${baseUrl}/roles/set_user`, controller.role.setUser);
  router.resources('file', '/api/v1/file', controller.testfile);
};
