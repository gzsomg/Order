<template>
  <div class="noticedetail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/notice' }">公告列表</el-breadcrumb-item>
      <el-breadcrumb-item>公告详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="noticemessage">
      <el-row>
        <el-col :span="24" class="title">
          <span>{{message.n_title}}</span>
        </el-col>
      </el-row>
      <div v-html="compiledMarkdown"></div>
      <el-row>
        <el-col :span="24" class="time">
          <p>{{message.n_datetime}}</p>
          <p>{{hospitalname}}</p>
        </el-col>
      </el-row>
    </div>
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
      hospitalname: '',
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (this.notice.n_id) {
        this.message = this.notice;
        this.message.n_datetime = this.$util.dateFormat(
          this.message.n_datetime,
          true
        );
        axios.get(this.$api.gethospital + `/${this.message.h_id}`).then(
          response => {
            // success callback
            console.log(response);
            this.hospitalname = response.data.hospital.h_name;
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      } else {
        this.$router.push('/user/notice');
        return;
      }
    },
  },
  computed: {
    ...mapGetters(['notice']),
    compiledMarkdown: function() {
      return marked(this.message.n_description, { sanitize: true });
    },
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.noticedetail
  margin-top: 55px
  padding: 26px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  min-height: 450px
  .el-breadcrumb
    padding-bottom: 20px
  .noticemessage
    .title
      color: #878d99
      font-weight: bold
      text-align: center
      font-size: x-large
      margin-bottom: 10px
    .time
      text-align: right
</style>
