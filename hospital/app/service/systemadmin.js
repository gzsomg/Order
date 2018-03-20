'use strict';
module.exports = app => {
  return class Expert extends app.Service {
    async uploadhospital(id, hospital) {
      try {
        const row = {
          h_img: hospital,
        };
        const result = await app.mysql.update('hospital', row, {
          where: { h_id: id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async getadminList(Page, Key) {
      try {
        console.log(Key);
        let sql = '';
        let sqlnum = '';
        if (Key === 'nokey') {
          sql =
            'SELECT a.*,b.h_name FROM admin a,hospital b where a.a_type=2 and b.h_id=a.h_id LIMIT ?, ?';
          sqlnum = 'SELECT COUNT(*) as count FROM admin where a_type=2';
        } else {
          sql =
            'SELECT a.*,b.h_name FROM admin a,hospital b WHERE  a.a_type=2 and b.h_id=a.h_id and a.a_name LIKE  "%' +
            Key +
            '%"  LIMIT ?, ?';
          sqlnum =
            'SELECT COUNT(*) as count FROM admin WHERE a_type=2 and a_name LIKE  "%' +
            Key +
            '%"';
        }
        const results = await this.app.mysql.query(sql, [(Page - 1) * 10, 10]);
        const totalCount = await this.app.mysql.query(sqlnum, [
          (Page - 1) * 10,
          10,
        ]);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }
    async getUserList(Page, Key) {
      try {
        console.log(Key);
        let sql = '';
        let sqlnum = '';
        if (Key === 'nokey') {
          sql = 'SELECT * FROM user  LIMIT ?, ?';
          sqlnum = 'SELECT COUNT(*) as count FROM user';
        } else {
          sql =
            'SELECT * FROM user  WHERE  u_name LIKE  "%' +
            Key +
            '%"  LIMIT ?, ?';
          sqlnum =
            'SELECT COUNT(*) as count FROM user WHERE u_name LIKE  "%' +
            Key +
            '%"';
        }
        const results = await this.app.mysql.query(sql, [(Page - 1) * 10, 10]);
        const totalCount = await this.app.mysql.query(sqlnum, [
          (Page - 1) * 10,
          10,
        ]);
        console.log(totalCount);
        return {
          list: results,
          total: totalCount[0].count,
        };
      } catch (err) {
        throw err;
      }
    }
    async adminUpdate(admin) {
      try {
        const row = {
          a_name: admin.a_name,
          a_password: admin.a_password,
          h_id: admin.h_id,
          a_avatar: admin.a_avatar,
        };
        const result = await this.app.mysql.update('admin', row, {
          where: { a_id: admin.a_id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async adminNew(admin) {
      try {
        const row = {
          a_name: admin.a_name,
          a_password: admin.a_password,
          a_type: 2,
          h_id: admin.h_id,
          a_avatar: admin.a_avatar,
        };
        const result = await this.app.mysql.insert('admin', row);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async adminDelete(aid) {
      try {
        const result = await this.app.mysql.delete('admin', {
          a_id: aid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async userDelete(uid) {
      try {
        const result = await this.app.mysql.delete('user', {
          u_id: uid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async getPatientlist(Uid) {
      try {
        const patients = await app.mysql.select('patient', {
          where: { u_id: Uid },
        });
        return {
          patients,
        };
      } catch (err) {
        throw err;
      }
    }
  };
};
