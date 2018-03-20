'use strict';
const Controller = require('egg').Controller;
class SearchController extends Controller {
  async getHospitalListByDistrict() {
    const hdistrict = this.ctx.params.key;
    const hospitals = await this.ctx.service.search.getHospitalListByDistrict(
      hdistrict
    );
    this.ctx.body = hospitals;
  }
  async getChilddepartmentListByDepartmentlist() {
    const hdistrict = this.ctx.params.key;
    console.log('是我');
    const childDepartments = await this.ctx.service.search.getChilddepartmentListByDepartmentlist(
      hdistrict
    );
    this.ctx.body = childDepartments;
  }
  async getDepaAndChildByHospital() {
    const hid = this.ctx.params.id;
    const result = await this.ctx.service.search.getDepaAndChildByHospital(hid);
    this.ctx.body = result;
  }
  async getHospAndDepaByChild() {
    const sid = this.ctx.params.id;
    const result = await this.ctx.service.search.getHospAndDepaByChild(sid);
    this.ctx.body = result;
  }
  async getExpertByChild() {
    const sid = this.ctx.params.id;
    const result = await this.ctx.service.search.getExpertByChild(sid);
    this.ctx.body = result;
  }
  async getHospitalByDistrictAndRank() {
    const district = this.ctx.params.district;
    const rank = this.ctx.params.rank;
    const result = await this.ctx.service.search.getHospitalByDistrictAndRank(
      district,
      rank
    );
    this.ctx.body = result;
  }
}
module.exports = SearchController;
