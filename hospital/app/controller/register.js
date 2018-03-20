'use strict';
const Controller = require('egg').Controller;
class RegisterController extends Controller {
  // 预约七天信息
  async getRegisterByExpert() {
    const e_id = this.ctx.params.id;
    const result = await this.ctx.service.register.getRegisterByExpert(e_id);
    const today = new Date().getDay();
    let register = new Array();
    for (let i = 0; i < 7; i++) {
      const oneday = {
        morning: 0,
        afternoon: 0,
        no: i + 1,
      };
      register[i] = oneday;
    }
    if (result.registers.length > 0) {
      result.registers.forEach(item => {
        let day = 0;
        if (item.r_datetime.getDay() >= today) {
          day = item.r_datetime.getDay() - today;
        } else {
          day = item.r_datetime.getDay() + 7 - today;
        }
        if (item.r_order < 6) {
          register[day].morning++;
          console.log(register);
        } else {
          register[day].afternoon++;
        }
      });
    }
    const returndata = {
      eid: e_id,
      registers: register,
    };
    this.ctx.body = returndata;
  }
  async registerNew(ctx) {
    const register = ctx.request.body;
    const date = new Date(register.r_datetime);
    register.r_datetime = date;
    const result = await this.ctx.service.register.registerNew(register);
    this.ctx.body = result;
  }
  async registerList() {
    const u_id = this.ctx.params.id;
    const r_state = this.ctx.params.key;
    const result = await this.ctx.service.register.registerList(u_id, r_state);
    this.ctx.body = result;
  }
  async cancelRegister() {
    const r_id = this.ctx.params.id;
    const result = await this.ctx.service.register.cancelRegister(r_id);
    this.ctx.body = result;
  }
  async deleteRegister() {
    const r_id = this.ctx.params.id;
    const result = await this.ctx.service.register.deleteRegister(r_id);
    this.ctx.body = result;
  }
}
module.exports = RegisterController;
