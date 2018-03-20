'use strict';
module.exports = app => {
  return class Expert extends app.Service {
    async getExpertList(hid, ePage, eKey) {
      try {
        let sql = '';
        let sqlnum = '';
        if (eKey === 'nokey') {
          sql = 'SELECT * FROM expert WHERE h_id = ?  LIMIT ?, ?';
          sqlnum = 'SELECT COUNT(*) as count FROM expert WHERE h_id = ?';
        } else {
          sql =
            'SELECT * FROM expert WHERE h_id = ? AND e_name LIKE  "%' +
            eKey +
            '%"  LIMIT ?, ?';
          sqlnum =
            'SELECT COUNT(*) as count FROM expert WHERE h_id = ? AND e_name LIKE  "%' +
            eKey +
            '%"';
        }
        const results = await this.app.mysql.query(sql, [
          hid,
          (ePage - 1) * 10,
          10,
        ]);
        const totalCount = await this.app.mysql.query(sqlnum, [
          hid,
          (ePage - 1) * 10,
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
    async getchilddepartmentbyexpert(eid) {
      try {
        const childdepartment = await app.mysql.get('smalldepartment', {
          s_id: eid,
        });
        const department = await app.mysql.get('department', {
          d_id: childdepartment.d_id,
        });
        const arr = new Array(0);
        arr.push(department);
        arr.push(childdepartment);
        return {
          arr,
        };
      } catch (error) {
        throw error;
      }
    }
    async expertUpdate(expert) {
      try {
        const result = await this.app.mysql.update('expert', expert, {
          where: { e_id: expert.e_id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async expertNew(expert) {
      try {
        const result = await this.app.mysql.insert('expert', expert);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async expertDelete(eid) {
      try {
        const result = await this.app.mysql.delete('expert', {
          e_id: eid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  };
};
