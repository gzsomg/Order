'use strict';
const Controller = require('egg').Controller;
class ArticleController extends Controller {
  async getArticlelist() {
    const Page = this.ctx.params.page;
    console.log(Page);
    const articles = await this.ctx.service.article.getArticlelist(Page);
    this.ctx.body = articles;
  }
  async articleNew(ctx) {
    const article = ctx.request.body;
    const result = await this.ctx.service.article.articleNew(article);
    this.ctx.body = result;
  }
  async articleDelete() {
    const aId = this.ctx.params.id;
    const result = await this.ctx.service.article.articleDelete(aId);
    this.ctx.body = result;
  }
  async getNoticelist() {
    const HId = this.ctx.params.id;
    const Page = this.ctx.params.page;
    const notices = await this.ctx.service.article.getNoticelist(HId, Page);
    this.ctx.body = notices;
  }
  async getAllHospitalNoticelist() {
    const Page = this.ctx.params.page;
    const notices = await this.ctx.service.article.getAllHospitalNoticelist(Page);
    this.ctx.body = notices;
  }
  async noticeNew(ctx) {
    console.log('hahah');
    const notice = ctx.request.body;
    const result = await this.ctx.service.article.noticeNew(notice);
    this.ctx.body = result;
  }
  async noticeDelete() {
    const aId = this.ctx.params.id;
    const result = await this.ctx.service.article.noticeDelete(aId);
    this.ctx.body = result;
  }
}
module.exports = ArticleController;
