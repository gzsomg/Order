<template>
  <div class="sidebar">
    <el-col :span="4" class="sidebar">
      <el-menu class="el-menu-vertical-demo" v-show="menushow" unique-opened router menu-trigger="hover">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-hospital-hospital" ></i>
            <span>医院管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1" :route="{path:'/admin/hospitallist'}">医院修改</el-menu-item>
            <el-menu-item index="1-2" :route="{path:'/admin/hospitalnew'}">医院新增</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-hospital-admin"></i>
            <span>医院管理员管理</span>
          </template>
          <el-menu-item index="2-1" :route="{path:'/admin/adminlist'}">管理员修改</el-menu-item>
          <el-menu-item index="2-2" :route="{path:'/admin/adminnew'}">管理员新增</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-hospital-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="3-1" :route="{path:'/admin/userlist'}">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-hospital-article"></i>
            <span>文章管理</span>
          </template>
          <el-menu-item index="4-1" :route="{path:'/admin/articlelist'}">文章列表</el-menu-item>
          <el-menu-item index="4-2" :route="{path:'/admin/articlenew'}">编写文章</el-menu-item>
        </el-submenu>
        <el-menu-item index="5" :route="{path:'/admin/adminmessage'}">
          <i class="el-icon-hospital-user"></i>
          <span slot="title">用户中心</span>
        </el-menu-item>
      </el-menu>

      <el-menu class="el-menu-vertical-demo" v-show="!menushow"  unique-opened router menu-trigger="hover">
        <el-menu-item index="1" :route="{path:'/admin/adminmessage'}">
          <i class="el-icon-hospital-user"></i>
          <span slot="title">用户中心</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-hospital-department"></i>
            <span>科室管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" :route="{path:'/admin/departmentlist'}">科室修改</el-menu-item>
            <el-menu-item index="2-2" :route="{path:'/admin/departmentnew'}">科室新增</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-hospital-department"></i>
            <span>子科室管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" :route="{path:'/admin/childdepartmentnew'}">子科室新增</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-hospital-expert"></i>
            <span>医生管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" :route="{path:'/admin/expertlist'}">医生修改</el-menu-item>
            <el-menu-item index="4-2" :route="{path:'/admin/expertnew'}">医生新增</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-hospital-notice"></i>
            <span>公告管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" :route="{path:'/admin/noticelist'}">公告列表</el-menu-item>
            <el-menu-item index="5-2" :route="{path:'/admin/noticenew'}">公告新增</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      admin: [],
      menushow: Boolean,
    };
  },
  created() {
    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      var admintype = this.admin.a_type;
      console.log(admintype);
      if (admintype === '1') {
        this.menushow = true;
      } else {
        this.menushow = false;
      }
    }
  },
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
 @import url("../../../assets/iconfont/iconfont")
.sidebar
  z-index: 999
  position: fixed
  top: 60px
  height: 100%
  border-right: solid 1px #e6e6e6
  .el-menu-vertical-demo
    border-right: 0px
    .el-submenu .el-menu-item
      min-width: 100px
      background-color: rgba(255, 255, 255, 0)
</style>
