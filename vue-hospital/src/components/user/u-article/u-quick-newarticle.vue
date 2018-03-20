<template>
    <div class="new-quick-article">
        <el-button type="primary" plain class="new-article" @click="articleMore()">
            <span class="more-left">最新文章</span>
            <span class="more-right">| 更多</span>
        </el-button>
        <ul class="article-list">
            <li v-for="(item,index) in articles" :key="item.id" @click="handleEdit(item)">
                <a class="article-item">
                    <el-button v-if="index==0" class="num" type="danger">{{index+1}}</el-button>
                    <el-button v-if="index==1" class="num" type="warning">{{index+1}}</el-button>
                    <el-button v-if="index==2" class="num" type="primary">{{index+1}}</el-button>
                    <el-button v-if="index>2" class="num" type="info">{{index+1}}</el-button>
                    {{item.a_title}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 5,
      articles: [],
    };
  },
  methods: {
    handleEdit(row) {
      this.setArticle(row);
      this.setMenu('6');
      this.$router.push({ path: '/user/articledetail' });
    },
    articleMore() {
      this.setMenu('6');
      this.$router.push({ path: '/user/article' });
    },
    ...mapMutations({
      setArticle: 'SET_ARTICLE',
      setMenu: 'SET_MENU',
    }),
  },
  created() {
    axios.get(this.$api.getArticlelist + `/${this.currentPage}`).then(
      response => {
        // success callback
        console.log(response);
        this.articles = response.data.list;
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
.new-quick-article
    padding-bottom: 5px  
    width: 100%
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    .new-article
        border-radius: 0px
        width: 100%
        border: 0
        .more-left
            float: left
        .more-right
            float: right
    .article-list
        list-style: none
        margin: 4px
        padding: 0px 5px
        li
            padding: 1px
            color: #000
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            a
                display: inline-block
                width: 100%
                .num
                    display: inline-block
                    width: 15px
                    line-height: 100%
                    font-size: 11px
                    padding: 3px 0px
                    text-align: center
                    border: 0px
                    margin-right: 5px
            a:hover
                display: inline-block
                color: #409EFF
                width: 100%
                font-weight: bolder
                .num
                    display: inline-block
                    width: 15px
                    line-height: 100%
                    font-size: 11px
                    padding: 3px 0px
                    text-align: center
                    border: 0px
                    margin-right: 5px
                    font-weight: bolder
</style>
