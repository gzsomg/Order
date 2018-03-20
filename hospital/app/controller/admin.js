'use strict';
const Controller = require('egg').Controller;
const toArray = require('stream-to-array');
const fs = require('mz/fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
class AdminController extends Controller {
  // 修改名称
  async adminNameupdate(ctx) {
    const admin = {
      Id: ctx.request.body.Id,
      name: ctx.request.body.name,
    };
    const result = await this.ctx.service.admin.adminNameupdate(admin);
    this.ctx.body = result;
  }
  // 修改密码
  async adminPasswordupdate(ctx) {
    const admin = {
      Id: ctx.request.body.Id,
      password: ctx.request.body.newpassword,
    };
    const result = await this.ctx.service.admin.adminPasswordupdate(admin);
    this.ctx.body = result;
  }
  // 医院新增
  async hospitalNew(ctx) {
    const hospital = {
      name: ctx.request.body.name,
      phone: ctx.request.body.phone,
      address: ctx.request.body.address,
      district: ctx.request.body.district,
      description: ctx.request.body.description,
      type: ctx.request.body.type,
      rank: ctx.request.body.rank,
      img: ctx.request.body.img,
    };
    const result = await this.ctx.service.admin.hospitalNew(hospital);
    this.ctx.body = result;
  }
  // 医院更新
  async hospitalUpdate(ctx) {
    const hospital = {
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      phone: ctx.request.body.phone,
      address: ctx.request.body.address,
      description: ctx.request.body.description,
      district: ctx.request.body.district,
      type: ctx.request.body.type,
      rank: ctx.request.body.rank,
      img: ctx.request.body.img,
    };
    const result = await this.ctx.service.admin.hospitalUpdate(hospital);
    this.ctx.body = result;
  }
  // 科室更新
  async departmentUpdate(ctx) {
    const department = {
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      hospitalId: ctx.request.body.hospitalId,
    };
    const result = await this.ctx.service.admin.departmentUpdate(department);
    this.ctx.body = result;
  }

  // 子科室更新
  async childDepartmentUpdate(ctx) {
    const childDepartment = {
      id: ctx.request.body.id,
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      departmentId: ctx.request.body.departmentId,
    };
    const result = await this.ctx.service.admin.childDepartmentUpdate(
      childDepartment
    );
    this.ctx.body = result;
  }
  // 科室新增
  async departmentNew(ctx) {
    const department = {
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      hospitalId: ctx.request.body.hospitalId,
    };
    const result = await this.ctx.service.admin.departmentNew(department);
    this.ctx.body = result;
  }
  // 子科室新增
  async childDepartmentNew(ctx) {
    const childdepartment = {
      name: ctx.request.body.name,
      description: ctx.request.body.description,
      departmentId: ctx.request.body.departmentId,
    };
    const result = await this.ctx.service.admin.childDepartmentNew(childdepartment);
    this.ctx.body = result;
  }
  // 科室删除
  async departmentDelete() {
    const dId = this.ctx.params.id;
    const result = await this.ctx.service.admin.departmentDelete(dId);
    this.ctx.body = result;
  }
  // 子科室删除
  async childDepartmentDelete() {
    const sId = this.ctx.params.id;
    const result = await this.ctx.service.admin.childDepartmentDelete(sId);
    this.ctx.body = result;
  }
  // 医院删除
  async hospitalDelete() {
    const hId = this.ctx.params.id;
    const result = await this.ctx.service.admin.hospitalDelete(hId);
    this.ctx.body = result;
  }
  // 头像
  async uploadavatar() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const date = new Date();
    const name = 'avatar' + date.getTime() + stream.filename;
    console.log(stream);
    const aid = stream.fields.aid;
    const oldavatar = stream.fields.oldavatar;
    const result = await this.ctx.service.admin.uploadavatar(aid, name);
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
    if (oldavatar.length > 0) {
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
}

module.exports = AdminController;
