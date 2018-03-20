
<template>
  <el-card class="quick-reservation">
    <h2 class="quick-title">
      <i class="el-icon-hospital-kuaijie"></i>快速预约</h2>
    <el-select v-model="district" placeholder="医院地区" @change="districtChange">
      <el-option v-for="item in districts" :key="item.name" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <el-select v-model="rank" placeholder="医院等级" @change="rankChange">
      <el-option label="三级甲等" value="三级甲等"></el-option>
      <el-option label="三级乙等" value="三级乙等"></el-option>
      <el-option label="二级甲等" value="二级甲等"></el-option>
      <el-option label="二级乙等" value="二级乙等"></el-option>
    </el-select>
    <el-select v-model="hospital" placeholder="医院名称" @change="hospitalChange">
      <el-option v-for="item in hospitals" :label="item.h_name" :key="item.h_name" :value="item.h_id"></el-option>
    </el-select>
    <el-cascader :options="options" placeholder="医院科室" @active-item-change="handleItemChange" @change="handleChange" :props="props">
    </el-cascader>
    <el-button type="primary" @click="quickreservation">快速查询</el-button>
  </el-card>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      district: '',
      rank: '',
      hospital: '',
      department: '',
      districts: [],
      childdepartment: '',
      hospitals: [],
      departments: [],
      options: [],
      props: {
        value: 'label',
        children: 'children',
      },
    };
  },
  methods: {
    districtChange(val) {
      if (this.rank.length == 0) {
        this.rank = '全部';
      }
      axios
        .get(
          this.$api.gethospitalbydistrictandrank +
            `/${this.district}/${this.rank}`
        )
        .then(
          response => {
            // success callback
            this.hospitals = response.data.hospitals;
            this.hospital = '';
            this.options = [];
            this.departments = [];
            this.department = '';
            this.childdepartment = '';
          },
          response => {
            console.log(response);
            // error callback
          }
        );
    },
    rankChange(val) {
      if (this.district.length == 0) {
        this.district = '全部';
      }
      axios
        .get(
          this.$api.gethospitalbydistrictandrank +
            `/${this.district}/${this.rank}`
        )
        .then(
          response => {
            // success callback
            this.hospitals = response.data.hospitals;
            this.hospital = '';
            this.options = [];
            this.departments = [];
            this.department = '';
            this.childdepartment = '';
          },
          response => {
            console.log(response);
            // error callback
          }
        );
    },
    hospitalChange(val) {
      axios.get(this.$api.getalldepartmentList + `/${val}`).then(
        response => {
          // success callback
          var list = response.data.department;
          list.forEach(item => {
            item.value = item.d_id;
            item.label = item.d_name;
            item.children = [];
          });
          this.options = list;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    quickreservation() {
      this.setChildDepartment(this.childdepartment);
      this.setMenu('0');
      this.$router.push({ path: '/user/registration' });
    },
    handleChange(val) {
      console.log(val);
      var arr = this.department.children;
      arr.forEach(item => {
        if (item.s_name == val[1]) {
          this.childdepartment = item;
        }
      });
      console.log(this.childdepartment);
    },
    handleItemChange(value) {
      var Num = 0,
        flag = false;
      var index = 0;
      this.options.forEach(item => {
        if (item.d_name == value && flag == false) {
          Num = item.d_id;
          this.department = item;
          flag = true;
        } else if (item.d_name != value && flag == false) {
          index++;
        }
      });
      axios.get(this.$api.getChildDepartmentList + `/${Num}`).then(
        response => {
          //success callback
          var list = response.data.smalldepartment;
          list.forEach(item => {
            item.value = item.s_id;
            item.label = item.s_name;
          });
          this.options[index].children = list;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    ...mapMutations({
      setChildDepartment: 'SET_CHILDDEPARTMENT',
      setMenu: 'SET_MENU',
    }),
  },
  created() {
    var districts = require('../../../assets/district.json');
    this.districts = districts.district;
    axios.get(this.$api.hospitallist).then(
      response => {
        // success callback
        console.log(response);
        this.hospitals = response.data.hospitals;
      },
      response => {
        console.log(response);
        // error callback
      }
    );
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.quick-reservation
  display: inline-block
  width: 100%
  background-image: url('../../../assets/images/quick.jpg')
  text-align: center
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .quick-title
    color: #fff
    .el-icon-hospital-kuaijie
      font-size: larger
  .el-select, .el-cascader
    margin-top: 26px
  .el-button
    margin-top: 28px
</style>
