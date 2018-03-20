'use strict';
module.exports = app => {
  return class Department extends app.Service {
    async hospitalList() {
      const hospitals = await app.mysql.select('hospital');
      return {
        hospitals,
      };
    }
    async ChildDepartmentList() {
      const sql =
        'SELECT smalldepartment.*,hospital.h_district,hospital.h_name,hospital.h_img,hospital.h_rank,department.d_name from smalldepartment,hospital,department WHERE smalldepartment.d_id=department.d_id AND department.h_id=hospital.h_id LIMIT 10;';
      const smalldepartment = await this.app.mysql.query(sql);
      return {
        smalldepartment,
      };
    }
    async getHospital(hid) {
      const hospital = await app.mysql.get('hospital', { h_id: hid });
      return {
        hospital,
      };
    }
    async getCommentlist(HID, Page) {
      try {
        const sqlnum =
          'SELECT COUNT(*) as count FROM comment where h_id=' + HID;
        const sql =
          'SELECT `comment`.*,`user`.u_name FROM `comment`,`user` WHERE `comment`.u_id=`user`.u_id AND `comment`.h_id =? ORDER BY `comment`.c_datetime DESC LIMIT ?,?;';
        const results = await this.app.mysql.query(sql, [
          HID,
          (Page - 1) * 10,
          10,
        ]);
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
    async getALLDepartmentList(hid) {
      const department = await app.mysql.select('department', {
        where: { h_id: hid },
      });
      return {
        department,
      };
    }
    async getChildDepartmentList(cDid) {
      try {
        const smalldepartment = await app.mysql.select('smalldepartment', {
          where: { d_id: cDid },
        });
        return {
          smalldepartment,
        };
      } catch (err) {
        throw err;
      }
    }

    async getDepartmentList(hid, dPage, dKey) {
      try {
        console.log(dKey);
        let sql = '';
        let sqlnum = '';
        if (dKey === 'nokey') {
          sql = 'SELECT * FROM department WHERE h_id = ?  LIMIT ?, ?';
          sqlnum = 'SELECT COUNT(*) as count FROM department WHERE h_id = ?';
        } else {
          sql =
            'SELECT * FROM department WHERE h_id = ? AND d_name LIKE  "%' +
            dKey +
            '%"  LIMIT ?, ?';
          sqlnum =
            'SELECT COUNT(*) as count FROM department WHERE h_id = ? AND d_name LIKE  "%' +
            dKey +
            '%"';
        }
        const results = await this.app.mysql.query(sql, [
          hid,
          (dPage - 1) * 10,
          10,
        ]);
        const totalCount = await this.app.mysql.query(sqlnum, [hid]);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }

    async getHospitalList(hPage, hKey) {
      try {
        console.log(hKey);
        let sql = '';
        let sqlnum = '';
        if (hKey === 'nokey') {
          sql = 'SELECT * FROM hospital  LIMIT ?, ?';
          sqlnum = 'SELECT COUNT(*) as count FROM hospital';
        } else {
          sql =
            'SELECT * FROM hospital WHERE  h_name LIKE  "%' +
            hKey +
            '%"  LIMIT ?, ?';
          sqlnum =
            'SELECT COUNT(*) as count FROM hospital WHERE h_name LIKE  "%' +
            hKey +
            '%"';
        }
        const results = await this.app.mysql.query(sql, [(hPage - 1) * 10, 10]);
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
