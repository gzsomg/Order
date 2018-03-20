'use strict';
module.exports = app => {
  return class Search extends app.Service {
    async getHospitalListByDistrict(district) {
      const hospitals = await app.mysql.select('hospital', {
        where: { h_district: district },
      });
      return {
        hospitals,
      };
    }
    async getChilddepartmentListByDepartmentlist(key) {
      const sql =
        'SELECT smalldepartment.*,hospital.h_district,hospital.h_name,hospital.h_img,hospital.h_rank,department.d_name from smalldepartment,hospital,department WHERE smalldepartment.d_id=department.d_id AND department.h_id=hospital.h_id AND department.d_name LIKE  "%' +
        key +
        '%"  LIMIT 10';
      const smalldepartment = await this.app.mysql.query(sql);
      return {
        smalldepartment,
      };
    }
    async getDepaAndChildByHospital(hid) {
      const sql =
        'SELECT department.d_id,department.d_name,smalldepartment.s_id,smalldepartment.s_name FROM department  JOIN smalldepartment ON department.h_id= ? AND department.d_id=smalldepartment.d_id;';
      const result = await this.app.mysql.query(sql, [hid]);
      return {
        result,
      };
    }
    async getHospAndDepaByChild(sid) {
      const sql =
        'SELECT hospital.*,department.*,smalldepartment.* FROM hospital,department,smalldepartment WHERE department.d_id=smalldepartment.d_id AND hospital.h_id=department.h_id AND smalldepartment.s_id= ?;';
      const result = await this.app.mysql.query(sql, [sid]);
      return {
        result,
      };
    }
    async getExpertByChild(sid) {
      const expert = await app.mysql.select('expert', {
        where: { s_id: sid },
      });
      return {
        expert,
      };
    }
    async getHospitalByDistrictAndRank(district, rank) {
      console.log(district + rank);
      let hospitals;
      if (district === '全部') {
        hospitals = await app.mysql.select('hospital', {
          where: { h_rank: rank },
        });
      } else if (rank === '全部') {
        hospitals = await app.mysql.select('hospital', {
          where: { h_district: district },
        });
      } else {
        hospitals = await app.mysql.select('hospital', {
          where: { h_district: district, h_rank: rank },
        });
      }
      return {
        hospitals,
      };
    }
  };
};
