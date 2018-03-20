'use strict';
module.exports = app => {
  return class Department extends app.Service {
    async adminNameupdate(admin) {
      try {
        const row = {
          a_name: admin.name,
        };
        const result = await app.mysql.update('admin', row, {
          where: { a_id: admin.Id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async adminPasswordupdate(admin) {
      try {
        const row = {
          a_password: admin.password,
        };
        const result = await app.mysql.update('admin', row, {
          where: { a_id: admin.Id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async uploadavatar(aid, avatar) {
      try {
        const row = {
          a_avatar: avatar,
        };
        const result = await app.mysql.update('admin', row, {
          where: { a_id: aid },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async hospitalNew(hospital) {
      try {
        const result = await app.mysql.insert('hospital', {
          h_name: hospital.name,
          h_phone: hospital.phone,
          h_address: hospital.address,
          h_district: hospital.district,
          h_description: hospital.description,
          h_type: hospital.type,
          h_rank: hospital.rank,
          h_img: hospital.img,
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async hospitalUpdate(hospital) {
      try {
        const row = {
          h_name: hospital.name,
          h_phone: hospital.phone,
          h_district: hospital.district,
          h_address: hospital.address,
          h_description: hospital.description,
          h_type: hospital.type,
          h_rank: hospital.rank,
          h_img: hospital.img,
        };
        const result = await app.mysql.update('hospital', row, {
          where: { h_id: hospital.id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async departmentUpdate(department) {
      try {
        const row = {
          d_name: department.name,
          d_description: department.description,
          h_id: department.hospitalId,
        };
        const result = await this.app.mysql.update('department', row, {
          where: { d_id: department.id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async childDepartmentUpdate(childDepartment) {
      try {
        const row = {
          s_name: childDepartment.name,
          s_description: childDepartment.description,
          d_id: childDepartment.departmentId,
        };
        const result = await this.app.mysql.update('smalldepartment', row, {
          where: { s_id: childDepartment.id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async departmentNew(department) {
      try {
        const row = {
          d_name: department.name,
          d_description: department.description,
          h_id: department.hospitalId,
        };
        const result = await this.app.mysql.insert('department', row);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async childDepartmentNew(childdepartment) {
      try {
        const row = {
          s_name: childdepartment.name,
          s_description: childdepartment.description,
          d_id: childdepartment.departmentId,
        };
        const result = await this.app.mysql.insert('smalldepartment', row);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async departmentDelete(did) {
      try {
        const result = await this.app.mysql.delete('department', {
          d_id: did,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async childDepartmentDelete(sid) {
      try {
        const result = await this.app.mysql.delete('smalldepartment', {
          s_id: sid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
    async hospitalDelete(hid) {
      try {
        const result = await this.app.mysql.delete('hospital', {
          h_id: hid,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  };
};
