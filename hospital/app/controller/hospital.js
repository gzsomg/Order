'use strict';
const Controller = require('egg').Controller;
class HospitalController extends Controller {
  async getHospitalListByChoose() {
    const Page = this.ctx.params.page;
    const Type = this.ctx.params.type;
    const District = this.ctx.params.district;
    const Rank = this.ctx.params.rank;
    const hospitals = await this.ctx.service.hospital.getHospitalListByChoose(
      Page,
      Type,
      District,
      Rank
    );
    this.ctx.body = hospitals;
  }
  async getChildDepartmentListByName() {
    const Page = this.ctx.params.page;
    const Key = this.ctx.params.key;
    const departments = await this.ctx.service.hospital.getChildDepartmentListByName(
      Page,
      Key
    );
    this.ctx.body = departments;
  }
}
module.exports = HospitalController;
