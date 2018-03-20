<template>
  <div class="userdetail">
    <div class="usermessage">
      <el-row>
        <el-col :span="4">
          <span> 头像</span>
        </el-col>
        <el-col :span="18">
         <img class='messavatar' :src="imageUrl" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span> 名称</span>
        </el-col>
        <el-col :span="18">
          <span> {{message.u_name}}</span>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="4">
          <span> 联系电话</span>
        </el-col>
        <el-col :span="18">
          <span> {{message.u_phone}}</span>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="4">
          <span> 电子邮箱</span>
        </el-col>
        <el-col :span="18">
          <span> {{message.u_email}}</span>
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="patients"
      style="width: 100%">
      <el-table-column
        prop="p_name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="p_age"
        label="年龄"
        width="100">
      </el-table-column>
       <el-table-column
        prop="p_gender"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="p_idcard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="p_medicarecard"
        label="医保卡号">
      </el-table-column>
      <el-table-column
        prop="p_phone"
        label="联系电话"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import Qs from 'qs';
export default {
  data() {
    return {
      message: {},
      patients: [],
      form: {},
      imageUrl: '',
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (this.user.u_id) {
        this.message = this.user;
        if (this.message.u_avatar.length > 0)
          this.imageUrl = this.$api.avatar + this.message.u_avatar;
        else this.imageUrl = this.$api.avatar + 'default.jpg';
        axios.get(this.$api.getpatientlist + `/${this.message.u_id}`).then(
          response => {
            // success callback
            console.log(response);
            this.patients = response.data.patients;
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      } else {
        this.$router.push('/admin/userlist');
        return;
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.userdetail
  position: relative
  top: 60px
  margin: 13px
  padding: 26px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .usermessage
    .el-row
      padding-bottom: 20px 
      .el-col
        color: #878d99
        font-weight: bold
      .messavatar
        width: 150px
        height: 150px
        border-radius: 50% 
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
</style>
