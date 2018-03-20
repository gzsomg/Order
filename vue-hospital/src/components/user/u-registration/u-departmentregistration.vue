<template>
  <div class="u-departmentregistration">
    <el-row>
      <el-col :span="left">

        <el-switch v-model="isOpen" number="50" active-color="#13ce66" inactive-color="#1fa4f0">
        </el-switch>
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item v-for="(item,index) in departments" :index="''+index" :key="item.d_id" @click="goAnchor(item)">
            <i :class="item.icon"></i>

            <span slot="title">{{item.name}}</span>

          </el-menu-item>
        </el-menu>

      </el-col>
      <el-col :span="right">
        <div class="departmentlist">

          <div v-for="department in departments" :key="department.d_id">
            <h2 :id="'de'+department.id">{{department.name}}</h2>
            <p v-for="item in department.childdepartments" :key="item.name" @click="getChildDepartmentList(item.name)">
              <a>{{item.name}}科</a>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      departments: [],
      isCollapse: true,
      isOpen: false,
      left: 2,
      right: 22,
    };
  },
  methods: {
    goAnchor(val) {
      var selector = '#de' + val.id;
      console.log(selector);
      var anchor = this.$el.querySelector(selector);
      //  document.body.scrollTop = anchor.offsetTop;
      document.documentElement.scrollTop = anchor.offsetTop;
    },
    getChildDepartmentList(val) {
      this.setChildDepartment(val);
      this.$router.push({ path: '/user/childdepartmentregistration' });
    },
    ...mapMutations({
      setChildDepartment: 'SET_CHILDDEPARTMENT',
      
    }),
  },
  watch: {
    isOpen: {
      handler: function(val, oldval) {
        if (oldval) {
          this.left = 2;
          this.right = 22;
          this.isCollapse = true;
        } else {
          this.left = 5;
          this.right = 19;
          this.isCollapse = false;
        }
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
  },
  created() {
    var departments = require('../../../assets/data.json');
    this.departments = departments.departments;
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.u-departmentregistration
  margin-top: 55px
  .el-radio-group
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .el-menu
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    margin-right: 10px
  .el-switch
    margin-left: 12px
    margin-bottom: 10px
  .departmentlist
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    padding: 20px
    h2
      color: #1fa4f0
      padding-bottom: 10px
      padding-left: 10px
      border-bottom: 1px dashed #dcdddd
    p
      width: 18%
      display: inline-block
      margin-left: 10px
      a:hover
        display: inline-block
        color: #409EFF
        width: 100%
        font-weight: bolder
</style>
