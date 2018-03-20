'use strict';
module.exports = app => {
  return class Article extends app.Service {
    async getArticlelist(Page) {
      try {
        const sqlnum = 'SELECT COUNT(*) as count FROM article';
        const results = await this.app.mysql.select('article', {
          limit: 10,
          orders: [['a_datetime', 'desc']],
          offset: (Page - 1) * 10,
        });
        const totalCount = await this.app.mysql.query(sqlnum);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }
    async articleNew(article) {
      try {
        article.a_datetime = app.mysql.literals.now;
        const result = await this.app.mysql.insert('article', article);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async articleDelete(aid) {
      try {
        const result = await this.app.mysql.delete('article', {
          a_id: aid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async getAllHospitalNoticelist(Page) {
      try {
        const sqlnum = 'SELECT COUNT(*) as count FROM notice';
        const results = await this.app.mysql.select('notice', {
          limit: 10,
          orders: [['n_datetime', 'desc']],
          offset: (Page - 1) * 10,
        });
        const totalCount = await this.app.mysql.query(sqlnum);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }
    async getNoticelist(HID, Page) {
      try {
        const sqlnum = 'SELECT COUNT(*) as count FROM notice where h_id=' + HID;
        const results = await this.app.mysql.select('notice', {
          where: { h_id: HID },
          limit: 10,
          orders: [['n_datetime', 'desc']],
          offset: (Page - 1) * 10,
        });
        const totalCount = await this.app.mysql.query(sqlnum);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }
    async noticeNew(notice) {
      try {
        notice.n_datetime = app.mysql.literals.now;
        const result = await this.app.mysql.insert('notice', notice);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async noticeDelete(nid) {
      try {
        const result = await this.app.mysql.delete('notice', {
          n_id: nid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  };
};
