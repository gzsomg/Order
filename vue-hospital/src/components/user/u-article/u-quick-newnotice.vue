<template>
    <div class="new-quick-notice">
        <el-button type="warning" plain class="new-notice" @click="noticeMore()">
            <span class="more-left">最新公告</span>
            <span class="more-right">| 更多</span>
        </el-button>
        <ul class="notice-list">
            <li v-for="(item,index) in notices" :key="item.id" @click="handleEdit(item)">
                <a>
                    <el-button v-if="index==0" class="num" type="danger">{{index+1}}</el-button>
                    <el-button v-if="index==1" class="num" type="warning">{{index+1}}</el-button>
                    <el-button v-if="index==2" class="num" type="primary">{{index+1}}</el-button>
                    <el-button v-if="index>2" class="num" type="info">{{index+1}}</el-button>
                    {{item.n_title}}
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
      pagesize: 10,
      notices: [],
    };
  },
  methods: {
    handleEdit(row) {
      this.setNotice(row);
      this.setMenu('5');
      this.$router.push({ path: '/user/noticedetail' });
    },
    noticeMore() {
      this.setMenu('5');
      this.$router.push({ path: '/user/notice' });
    },
    ...mapMutations({
      setNotice: 'SET_Notice',
      setMenu: 'SET_MENU',
    }),
  },
  created() {
    axios.get(this.$api.getallhospitalnoticelist + `/${this.currentPage}`).then(
      response => {
        // success callback
        console.log(response);
        this.notices = response.data.list;
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
.new-quick-notice
    padding-bottom: 5px
    width: 100%
    margin-top: 5px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    .new-notice
        border-radius: 0px
        width: 100%
        border: 0
        .more-left
            float: left
        .more-right
            float: right
    .notice-list
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
                color: #E6A23C
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
