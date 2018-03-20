'use strict';
const Controller = require('egg').Controller;
class DepartmentController extends Controller {
  async hospitalList() {
    const hospitals = await this.ctx.service.department.hospitalList();
    this.ctx.body = hospitals;
  }
  async ChildDepartmentList() {
    const childDepartments = await this.ctx.service.department.ChildDepartmentList();
    this.ctx.body = childDepartments;
  }
  async getHospital() {
    const hId = this.ctx.params.id;
    const hospital = await this.ctx.service.department.getHospital(hId);
    this.ctx.body = hospital;
  }
  async getCommentlist() {
    const HId = this.ctx.params.id;
    const Page = this.ctx.params.page;
    const comments = await this.ctx.service.department.getCommentlist(
      HId,
      Page
    );
    this.ctx.body = comments;
  }
  async getALLDepartmentList() {
    const hId = this.ctx.params.id;
    const departents = await this.ctx.service.department.getALLDepartmentList(
      hId
    );
    this.ctx.body = departents;
  }
  async getDepartmentList() {
    const hId = this.ctx.params.id;
    const dPage = this.ctx.params.page;
    const dKey = this.ctx.params.key;
    const departents = await this.ctx.service.department.getDepartmentList(
      hId,
      dPage,
      dKey
    );
    this.ctx.body = departents;
  }
  async getChildDepartmentList() {
    const CDId = this.ctx.params.id;
    const departents = await this.ctx.service.department.getChildDepartmentList(
      CDId
    );
    this.ctx.body = departents;
  }
  async getHospitalList() {
    const hPage = this.ctx.params.page;
    const hKey = this.ctx.params.key;
    const hospitals = await this.ctx.service.department.getHospitalList(
      hPage,
      hKey
    );
    this.ctx.body = hospitals;
  }
}

module.exports = DepartmentController;
