'use strict';
module.exports = app => {
  return class register extends app.Service {
    // 预约七天信息
    async getRegisterByExpert(id) {
      const registers = await app.mysql.select('register', {
        where: { e_id: id, r_state: '等待就诊' },
      });
      return {
        registers,
      };
    }
    async registerNew(register) {
      try {
        const result = await app.mysql.insert('register', register);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async registerList(id, state) {
      const sql =
        'SELECT register.*,patient.*,expert.*,hospital.h_name,smalldepartment.s_name,department.d_name FROM register,patient,expert,user,hospital,smalldepartment,department where register.p_id=patient.p_id AND hospital.h_id=expert.h_id AND department.d_id=smalldepartment.d_id AND patient.u_id=user.u_id AND register.e_id=expert.e_id AND register.r_state=? And smalldepartment.s_id=expert.s_id AND `user`.u_id=? order by register.r_datetime desc;';
      const registers = await this.app.mysql.query(sql, [state, id]);
      return {
        registers,
      };
    }
    async cancelRegister(id) {
      try {
        const row = {
          r_state: '取消预约',
        };
        const result = await app.mysql.update('register', row, {
          where: { r_id: id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async deleteRegister(id) {
      try {
        const result = await app.mysql.delete('register', {
          r_id: id,
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async updatedRegister() {
      try {
        const row = {
          r_state: '违约',
        };
        const result = await this.app.mysql.update('register', row, {
          where: { r_state: '等待就诊' },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
  };
};
