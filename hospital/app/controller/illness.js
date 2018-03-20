'use strict';
const Controller = require('egg').Controller;
class IllnessController extends Controller {
  async illnessList() {
    const key = this.ctx.params.key;
    const result = await this.ctx.service.illness.illnessList(key);
    this.ctx.body = result;
  }
  async getChildDepartmentListByIllness() {
    const Page = this.ctx.params.page;
    const Key = this.ctx.params.key;
    const departments = await this.ctx.service.illness.getChildDepartmentListByIllness(
      Page,
      Key
    );
    this.ctx.body = departments;
  }
}
module.exports = IllnessController;
