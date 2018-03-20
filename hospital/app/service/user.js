'use strict';
module.exports = app => {
  return class User extends app.Service {
    // 注册
    async signUp(user) {
      const result = await app.mysql.insert('user', {
        u_name: user.name,
        u_password: user.password,
        u_phone: user.phone,
        u_email: user.email,
      });
      return result.affectedRows;
    }
    // 登录
    async login(user) {
      if (user.type === '1') {
        const result = await app.mysql.get('user', {
          u_name: user.name,
          u_password: user.password,
        });
        return result;
      } else if (user.type === '2') {
        const result = await app.mysql.get('admin', {
          a_name: user.name,
          a_password: user.password,
        });
        console.log(result);
        return result;
      }
    }
    async find(uid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = await app.mysql.get('user', {
        u_id: uid,
      });
      return {
        user,
      };
    }

    async userlist() {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const users = await app.mysql.select('user');
      return {
        users,
      };
    }
    // 留言
    async publishComment(comment) {
      try {
        comment.c_datetime = app.mysql.literals.now;
        const result = await this.app.mysql.insert('comment', comment);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    async uploadavatar(uid, avatar) {
      try {
        console.log(uid + avatar);
        const row = {
          u_avatar: avatar,
        };
        const result = await app.mysql.update('user', row, {
          where: { u_id: uid },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    // 用户信息
    async userMessageupdate(user) {
      try {
        const result = await app.mysql.update('user', user, {
          where: { u_id: user.u_id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    // 患者列表
    async getPatientsByUser(id) {
      const patients = await app.mysql.select('patient', {
        where: { u_id: id },
      });
      return {
        patients,
      };
    }
    // 患者新增
    async patientNew(patient) {
      try {
        const result = await app.mysql.insert('patient', patient);
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    // 患者更新
    async patientUpdate(patient) {
      try {
        const result = await app.mysql.update('patient', patient, {
          where: { p_id: patient.p_id },
        });
        return result.affectedRows;
      } catch (err) {
        throw err;
      }
    }
    // 患者删除
    async patientDelete(id) {
      try {
        const result = await this.app.mysql.delete('patient', {
          p_id: id,
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  };
};
