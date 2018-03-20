<template>
  <div class="header">
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#409EFF" text-color="#fff" active-text-color="#fff">
      <el-menu-item class="systemName" index="1"><i class='el-icon-hospital-hospital'/>医院预约挂号系统</el-menu-item>
      <el-menu-item class="right" index="3"> {{hospitalname}}<img :src="avatar" class="headerAvatar" />{{admin.a_name}}
        <el-button @click="logout" type="primary" plain size="mini" round>退出</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Qs from 'qs';
import axios from 'axios';
export default {
  data() {
    return {
      admin: [],
      hospitalname: '',
      avatar: '',
    };
  },
  created() {
    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      if (this.admin.a_avatar.length > 0)
          this.avatar = this.$api.avatar + this.admin.a_avatar;
        else this.avatar = this.$api.avatar + 'default.jpg';
      if (this.admin.h_id) {
        var hospitalId = this.admin.h_id;
        axios.get(this.$api.gethospital + `/${hospitalId}`).then(
          response => {
            // success callback
            console.log(response);
            this.hospitalname = response.data.hospital.h_name + '的：  ';
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
    } else {
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    logout: function(event) {
      sessionStorage.clear('admin');
      this.$router.push({ path: '/' });
    },
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.header
  position: fixed
  top: 0px
  width: 100%
  z-index: 100
  .el-menu
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    padding-right: 0px
    .systemName
      font-size: larger
      .el-icon-hospital-hospital
        color: #fff
        font-size: larger 
    .right
      float: right
      margin-right: 2px
      .headerAvatar
        width: 35px
        display: inline
        margin-right:10px 
        border-radius: 50% 
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
      .el-menu-item
        min-width: 100px
</style>
