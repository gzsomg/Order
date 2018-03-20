'use strict';
module.exports = app => {
  return class illness extends app.Service {
    async illnessList(key) {
      try {
        const result = await this.app.mysql.select('illness', {
          where: { i_bigcategary: key },
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async getChildDepartmentListByIllness(page, key) {
      try {
        const sql =
          'SELECT smalldepartment.*,department.*,hospital.* from smalldepartment,department,hospital WHERE smalldepartment.d_id=department.d_id And department.h_id=hospital.h_id AND smalldepartment.s_name LIKE "%' +
          key +
          '%" LIMIT ?, ?';
        const sqlnum =
          'SELECT COUNT(*) as count from smalldepartment,department,hospital WHERE smalldepartment.d_id=department.d_id And department.h_id=hospital.h_id AND smalldepartment.s_name LIKE "%' +
          key +
          '%"';
        const results = await this.app.mysql.query(sql, [(page - 1) * 10, 10]);
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
  };
};
