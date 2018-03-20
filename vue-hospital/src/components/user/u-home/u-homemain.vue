<template>
  <div class="home-main">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-hospital-hospital"></i> 医院</span>
        <div class="districts">
          <el-button type="primary" size="small" plain @click="chooseDistricts()">全部</el-button>
          <el-button type="primary" size="small" plain v-for="item in districts" :key="item.name" @click="chooseDistricts(item.name)">{{item.name}}</el-button>
        </div>
        <div class="hospital-list">
          <el-card v-for="(item,index) in hospitals" :key="item.h_id" v-if="index<10">
            <el-row v-if="index<4">
              <el-col :span="8">
                <img :src="item.h_img" class="h_image">
              </el-col>
              <el-col :span="16">
                <p @click="chooseHospital(item)">
                  <span class="h_name">{{ item.h_name }}</span>
                  <span class="h_rank">【{{item.h_rank}}】</span>
                </p>
                <div class="h_district">
                  <p>地区：{{item.h_district}}</p>
                  <p>地址：{{item.h_address}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="index>=4">
              <el-col :span="24">

                <span class="h_name" @click="chooseHospital(item)">{{ item.h_name }}</span>
                <span class="h_rank">【{{item.h_rank}}】</span>

              </el-col>
            </el-row>
          </el-card>
        </div>
        <div class="more">
          <el-button type="text" @click="hospitalRegistration">更多医院</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-hospital-department"></i> 科室</span>
        <div class="districts">
          <el-button type="primary" size="small" plain @click="chooseDepartments()">全部</el-button>
          <el-button type="primary" size="small" plain v-for="item in departments" :key="item.d_name" @click="chooseDepartments(item.name)">{{item.name}}</el-button>
        </div>
        <div class="hospital-list">
          <el-card v-for="(item,index) in hospitaldepartments" :key="item.h_id" v-if="index<10">
            <el-row v-if="index<4">
              <el-col :span="8">
                <img :src="item.h_img" class="h_image">
              </el-col>
              <el-col :span="16">
                <p>
                  <span class="h_name">{{ item.h_name }}</span>
                  <span class="h_rank">【{{item.h_rank}}】</span>
                </p>
                <div class="h_district">
                  <p>地区：{{item.h_district}}</p>
                  <p>
                    <el-button size="mini" type="primary" plain round>{{item.d_name}}</el-button>
                    <el-button @click="chooseChildDepartment(item)" plain size="mini" type="warning" round>{{item.s_name}}</el-button>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="index>=4">
              <el-col :span="24">

                <span class="h_name" @click="setChildDepartment(item)">{{ item.h_name }}</span>
                <span class="h_rank">
                  <el-button size="mini" type="primary" plain round>{{item.d_name}}</el-button>
                  <el-button @click="chooseChildDepartment(item)" plain size="mini" type="warning" round>{{item.s_name}}</el-button>
                </span>

              </el-col>
            </el-row>
          </el-card>
        </div>
        <div class="more">
          <el-button type="text" @click="departmentRegistration">更多科室</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      districts: [],
      hospitals: [],
      hospitaldepartments: [],
      departments: [],
    };
  },
  methods: {
    hospitalRegistration() {
      this.setMenu('2');
      this.$router.push({ path: '/user/hospitalregistration' });
    },
    departmentRegistration() {
      this.setMenu('3');
      this.$router.push({ path: '/user/departmentregistration' });
    },
    chooseDistricts(district) {
      if (district) {
        axios.get(this.$api.gethospitallistbydistrict + `/${district}`).then(
          response => {
            // success callback
            console.log(response);
            this.hospitals = response.data.hospitals;
            this.hospitals.forEach(item => {
              if (item.h_img.length > 0)
                item.h_img = this.$api.hospitalimg + item.h_img;
              else item.h_img = this.$api.hospitalimg + 'default.jpg';
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      } else {
        axios.get(this.$api.hospitallist).then(
          response => {
            // success callback
            console.log(response);

            this.hospitals = response.data.hospitals;
            this.hospitals.forEach(item => {
              if (item.h_img.length > 0)
                item.h_img = this.$api.hospitalimg + item.h_img;
              else item.h_img = this.$api.hospitalimg + 'default.jpg';
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
    },
    chooseDepartments(department) {
      if (department) {
        axios.get(this.$api.getchilddepartmentlistbydepartmentlist + `/${department}`).then(
          response => {
            // success callback
            console.log(response);
            this.hospitaldepartments = response.data.smalldepartment;
            this.hospitaldepartments.forEach(item => {
              if (item.h_img.length > 0)
                item.h_img = this.$api.hospitalimg + item.h_img;
              else item.h_img = this.$api.hospitalimg + 'default.jpg';
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      } else {
        axios.get(this.$api.childdepartmentlist).then(
          response => {
            // success callback
            console.log(response);
            this.hospitaldepartments = response.data.smalldepartment;
            this.hospitaldepartments.forEach(item => {
              if (item.h_img.length > 0)
                item.h_img = this.$api.hospitalimg + item.h_img;
              else item.h_img = this.$api.hospitalimg + 'default.jpg';
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
    },
    chooseHospital(item) {
      this.setHospital(item);
      this.setMenu('0');
      this.$router.push({ path: '/user/hospital' });
    },
    chooseChildDepartment(item) {
      this.setChildDepartment(item);
      this.setMenu('0');
      this.$router.push({ path: '/user/registration' });
    },
    ...mapMutations({
      setHospital: 'SET_HOSPITAL',
      setMenu: 'SET_MENU',
      setChildDepartment: 'SET_CHILDDEPARTMENT',
    }),
  },
  created() {
    var districts = require('../../../assets/district.json');
    this.districts = districts.district;
    var departments = require('../../../assets/data.json');
    this.departments = departments.departments;
    axios.get(this.$api.hospitallist).then(
      response => {
        // success callback
        this.hospitals = response.data.hospitals;
        this.hospitals.forEach(item => {
          if (item.h_img.length > 0)
            item.h_img = this.$api.hospitalimg + item.h_img;
          else item.h_img = this.$api.hospitalimg + 'default.jpg';
        });
      },
      response => {
        console.log(response);
        // error callback
      }
    );
    axios.get(this.$api.childdepartmentlist).then(
      response => {
        // success callback
        console.log(response);
        this.hospitaldepartments = response.data.smalldepartment;
        this.hospitaldepartments.forEach(item => {
          if (item.h_img.length > 0)
            item.h_img = this.$api.hospitalimg + item.h_img;
          else item.h_img = this.$api.hospitalimg + 'default.jpg';
        });
      },
      response => {
        console.log(response);
        // error callback
      }
    );
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-main
  width: 100%
  height: 100%
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .districts
    margin: 5px
  .el-button
    margin: 2px
  .hospital-list
    margin-top: 15px
    .el-card
      display: inline-block
      width: 49%
      margin: 2px
      .el-card__body
        padding: 0px !important
        .h_image
          width: 100%
          height: 120px
          display: block
          border-radius: 3px
        .h_name
          float: left
          color: #036eb7
        .h_rank
          float: right
          font-size: 14px
          color: #979797
        .h_district
          clear: both
          font-size: 14px
          color: #979797
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
  .more
    width: 100%
    margin-top: 15px
    text-align: center
</style>
