'use strict';
const Subscription = require('egg').Subscription;
class UpdateRegisterStatus extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10000s', // 10 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  async subscribe() {
    // const res = await this.ctx.service.register.updatedRegister();
    console.log('1');
  }
}
module.exports = UpdateRegisterStatus;