<template>
    <div class="articledetail">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/user/article' }">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="articlemessage">
            <el-row>
                <el-col :span="22" class="title">
                    <span>{{message.a_title}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="time">
                    <span>{{message.a_datetime}}</span>
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
      if (this.article.a_id) {
        this.message = this.article;
        this.message.a_datetime = this.$util.dateFormat(
          this.message.a_datetime,
          true
        );
      } else {
        this.$router.push('/admin/articlelist');
        return;
      }
    },
  },
  computed: {
    ...mapGetters(['article']),
    compiledMarkdown: function() {
      return marked(this.message.a_description, { sanitize: true });
    },
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.articledetail
    margin-top: 55px
    padding: 26px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    min-height: 450px
    .el-breadcrumb
        padding-bottom: 20px 
    .articlemessage
        .title
            color: #878d99
            font-weight: bold
            text-align: center
            font-size: x-large
            margin-bottom: 10px
        .time
            text-align: right
            font-size: small
            margin-bottom: 20px
</style>
