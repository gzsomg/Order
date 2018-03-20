'use strict';
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const fs = require('mz/fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class UserController extends Controller {
  async signUp(ctx) {
    const user = {
      name: ctx.request.body.name,
      password: ctx.request.body.password,
      phone: ctx.request.body.phone,
      email: ctx.request.body.email,
    };
    const result = await this.ctx.service.user.signUp(user);
    this.ctx.body = result;
  }
  async login(ctx) {
    const user = {
      name: ctx.request.body.name,
      password: ctx.request.body.password,
      type: ctx.request.body.type,
    };
    const result = await this.ctx.service.user.login(user);
    console.log(result);
    let ret = result;
    if (result === null) {
      ret = {
        errmsg: '用户名或密码错误',
      };
    }
    this.ctx.body = ret;
  }
  async info() {
    const userId = this.ctx.params.id;
    const user = await this.ctx.service.user.find(userId);
    this.ctx.body = user;
  }

  async userlist() {
    const users = await this.ctx.service.user.userlist();
    this.ctx.body = users;
  }
  // 留言
  async publishComment(ctx) {
    console.log('as');
    const comment = ctx.request.body;
    const result = await this.ctx.service.user.publishComment(comment);
    this.ctx.body = result;
  }
  // 用户信息
  async userMessageupdate(ctx) {
    const user = ctx.request.body;
    const result = await this.ctx.service.user.userMessageupdate(user);
    this.ctx.body = result;
  }
  // 头像
  async userUploadavatar() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const date = new Date();
    const name = 'avatar' + date.getTime() + stream.filename;
    console.log(stream);
    const uid = stream.fields.uid;
    const oldavatar = stream.fields.oldavatar;
    const result = await this.ctx.service.user.uploadavatar(uid, name);
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    const filename = encodeURIComponent(name);
    const target = path.join(
      this.config.baseDir,
      'app/public/images/avatar',
      filename
    );
    await fs.writeFile(target, buf);
    if (oldavatar.length > 0 && oldavatar !== 'default.jpg') {
      const deltarget = path.join(
        this.config.baseDir,
        'app/public/images/avatar',
        oldavatar
      );
      fs.unlinkSync(deltarget, function(err) {
        if (err) throw err;
      });
    }
    stream.fields.newavatar = filename;
    stream.fields.result = result;
    ctx.body = {
      // 所有表单字段都能通过 `stream.fields` 获取到
      fields: stream.fields,
    };
  }
  // 患者列表
  async getPatientsByUser() {
    const u_id = this.ctx.params.id;
    const result = await this.ctx.service.user.getPatientsByUser(u_id);
    this.ctx.body = result;
  }
  // 患者新增
  async patientNew(ctx) {
    const patient = ctx.request.body;
    const result = await this.ctx.service.user.patientNew(patient);
    this.ctx.body = result;
  }
  // 患者更新
  async patientUpdate(ctx) {
    const patient = ctx.request.body;
    const result = await this.ctx.service.user.patientUpdate(patient);
    this.ctx.body = result;
  }
  // 患者删除
  async patientDelete() {
    const PId = this.ctx.params.id;
    const result = await this.ctx.service.user.patientDelete(PId);
    this.ctx.body = result;
  }
}
module.exports = UserController;
