'use strict';
const Controller = require('egg').Controller;
class ExpertController extends Controller {
  async getExpertList() {
    const HId = this.ctx.params.id;
    const EPage = this.ctx.params.page;
    const EKey = this.ctx.params.key;
    const experts = await this.ctx.service.expert.getExpertList(
      HId,
      EPage,
      EKey
    );
    this.ctx.body = experts;
  }
  async getchilddepartmentbyexpert() {
    const EId = this.ctx.params.id;
    const childdepartment = await this.ctx.service.expert.getchilddepartmentbyexpert(
      EId
    );
    this.ctx.body = childdepartment;
  }
  async expertUpdate(ctx) {
    const expert = ctx.request.body;
    const result = await this.ctx.service.expert.expertUpdate(expert);
    this.ctx.body = result;
  }
  async expertNew(ctx) {
    const expert = ctx.request.body;
    const result = await this.ctx.service.expert.expertNew(expert);
    this.ctx.body = result;
  }
  async expertDelete() {
    const eId = this.ctx.params.id;
    const result = await this.ctx.service.expert.expertDelete(eId);
    this.ctx.body = result;
  }
}
module.exports = ExpertController;
