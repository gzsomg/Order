<template>
  <div class="noticedetail">
    <div class="noticemessage">
      <el-row>
        <el-col :span="24" class="title">
        <span>{{message.n_title}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="time">
        <span>{{message.n_datetime}}</span>
        </el-col>
      </el-row>
      <div v-html="compiledMarkdown"></div>
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
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (this.notice.n_id) {
        this.message = this.notice;
        this.message.n_datetime=this.$util.dateFormat(this.message.n_datetime,true);
      } else {
        this.$router.push('/admin/noticelist');
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
  position: relative
  top: 60px
  margin: 13px
  padding: 26px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .noticemessage
      .title
        color: #878d99
        font-weight: bold
        text-align: center 
        font-size: x-large 
        margin-bottom: 10px  
      .time
        text-align:right 
        font-size: small 
        margin-bottom: 20px  
</style>
