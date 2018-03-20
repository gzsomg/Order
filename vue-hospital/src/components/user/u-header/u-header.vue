<template>
  <div class="uheader">
    <el-row class="top_user">
      <el-col :span="24">
        <span>欢迎来到医院预约挂号平台</span>
        <img :src="avatar" class="headerAvatar" />{{user.u_name}}
        <el-button @click="userCenter" type="text" plain size="mini" round>用户中心</el-button>
        <el-button @click="registrationList" type="text" plain size="mini" round>预约单</el-button>
        <el-button @click="logout" type="text" plain size="mini" round>退出</el-button>
      </el-col>
    </el-row>
    <el-row class="top_title">
      <el-col :span="24">
        <h1>
          <i class='el-icon-hospital-hospital' />
          <span class="top_title_name">医院预约挂号系统</span>
        </h1>
      </el-col>
    </el-row>
    <el-menu class="el-menu-demo" router mode="horizontal" :default-active="menu" background-color="#60bff2" text-color="#fff" active-text-color="#fff" @select="handleSelect">
      <el-menu-item class="first_item" index="1" :route="{path:'/user/home'}">{{first_item_name}}</el-menu-item>
      <el-menu-item index="2" :route="{path:'/user/hospitalregistration'}">按医院挂号</el-menu-item>
      <el-menu-item index="3" :route="{path:'/user/departmentregistration'}">按科室挂号</el-menu-item>
      <el-menu-item index="4" :route="{path:'/user/illnessregistration'}">按疾病挂号</el-menu-item>
      <el-menu-item index="5" :route="{path:'/user/notice'}">最新公告</el-menu-item>
      <el-menu-item index="6" :route="{path:'/user/article'}">最新文章</el-menu-item>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Qs from 'qs';
import axios from 'axios';
export default {
  data() {
    return {
      activeIndex: 1,
      first_item_name: '全部科室',
    };
  },
  created() {
    this.activeIndex = '1';
    if (sessionStorage.getItem('user')) {
      this.user = Qs.parse(sessionStorage.getItem('user'));
      if (this.user.u_avatar.length > 0)
        this.avatar = this.$api.avatar + this.user.u_avatar;
      else this.avatar = this.$api.avatar + 'default.jpg';
    } else {
      this.$router.push({ path: '/' });
    }
  },
  computed: {
    // ...mapGetters(['menu']),
    ...mapGetters({ menu: 'menu' }),
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      this.setMenu(key);
      if (key == 1) {
        this.first_item_name = '全部科室';
      } else {
        this.first_item_name = '首页';
      }
    },
    logout: function(event) {
      sessionStorage.clear('user');
      this.$router.push({ path: '/' });
    },
    userCenter: function() {
      this.setMenu('0');
      this.$router.push({ path: '/user/usercenter' });
    },
    registrationList: function() {
      this.setMenu('0');
      this.$router.push({ path: '/user/registrationlist' });
    },
    ...mapMutations({
      setMenu: 'SET_MENU',
    }),
  },
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.uheader
  background-color: #fff
  .top_user
    background-color: #f5f5f5
    position: fixed
    top: 0
    height: 30px
    z-index: 999
    left: 0
    width: 100%
    .el-col
      display: flex
      align-items: center
      justify-content: flex-end
      font-size: 14px
      color: #868686
      padding-right: 10px
      .el-button
        padding-right: 0px
        padding-left: 0px
        margin-left: 10px
      .headerAvatar
        width: 20px
        display: inline
        margin-right: 10px
        margin-left: 10px
        border-radius: 50%
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .top_title
    margin-top: 35px
    .el-icon-hospital-hospital
      font-size: 60px
      color: #006db3
    .top_title_name
      position: relative
      color: #006db3
      top: -12px
  .el-menu-demo
    position: absolute
    left: 0
    width: 100%
    height: 45px
    line-height: 45px
    min-width: 1000px
    padding-left: 15%
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .el-menu-item
    padding: 0 20px
    height: 45px
    line-height: 45px
    font-size: 16px
  .el-menu-item.is-active
    background-color: #1fa4f0 !important
  .first_item
    padding: 0 78px
</style>
