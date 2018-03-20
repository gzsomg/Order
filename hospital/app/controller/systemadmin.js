'use strict';
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const fs = require('mz/fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class SystemAdminController extends Controller {
  async uploadhospital() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const date = new Date();
    const name = 'hospital' + date.getTime() + stream.filename;
    console.log(stream);
    const id = stream.fields.id;
    const oldavatar = stream.fields.oldavatar;
    const result = await this.ctx.service.systemadmin.uploadhospital(id, name);
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
      'app/public/images/hospital',
      filename
    );
    await fs.writeFile(target, buf);
    if (oldavatar.length > 0) {
      const deltarget = path.join(
        this.config.baseDir,
        'app/public/images/hospital',
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
  async getadminList() {
    const Page = this.ctx.params.page;
    const Key = this.ctx.params.key;
    const admins = await this.ctx.service.systemadmin.getadminList(Page, Key);
    this.ctx.body = admins;
  }
  async getPatientlist() {
    const Uid = this.ctx.params.id;
    const patients = await this.ctx.service.systemadmin.getPatientlist(Uid);
    this.ctx.body = patients;
  }
  async getUserList() {
    const Page = this.ctx.params.page;
    const Key = this.ctx.params.key;
    const users = await this.ctx.service.systemadmin.getUserList(Page, Key);
    this.ctx.body = users;
  }
  async adminUpdate(ctx) {
    const admin = ctx.request.body;
    const result = await this.ctx.service.systemadmin.adminUpdate(admin);
    this.ctx.body = result;
  }
  async adminNew(ctx) {
    const admin = ctx.request.body;
    const result = await this.ctx.service.systemadmin.adminNew(admin);
    this.ctx.body = result;
  }
  async adminDelete() {
    const aId = this.ctx.params.id;
    const result = await this.ctx.service.systemadmin.adminDelete(aId);
    this.ctx.body = result;
  }
  async userDelete() {
    const uId = this.ctx.params.id;
    const result = await this.ctx.service.systemadmin.userDelete(uId);
    this.ctx.body = result;
  }
}
module.exports = SystemAdminController;
