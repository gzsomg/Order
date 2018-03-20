'use strict';
module.exports = app => {
  return class Hospital extends app.Service {
    async getHospitalListByChoose(page, type, district, rank) {
      try {
        if (type === '全部') {
          type = '';
        }
        if (district === '全部') {
          district = '';
        }
        if (rank === '全部') {
          rank = '';
        }
        const sql =
          'SELECT * FROM hospital WHERE  h_type LIKE  "%' +
          type +
          '%" AND h_district LIKE  "%' +
          district +
          '%" AND h_rank LIKE  "%' +
          rank +
          '%" LIMIT ?, ?';
        const sqlnum =
          'SELECT COUNT(*) as count FROM hospital WHERE h_type LIKE  "%' +
          type +
          '%" AND h_district LIKE  "%' +
          district +
          '%" AND h_rank LIKE  "%' +
          rank +
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
    async getChildDepartmentListByName(page, key) {
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
