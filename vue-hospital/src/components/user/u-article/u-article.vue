<template>
    <div class="u-article">
        <el-table :data="tableData" stripe class="updateTable">
            <el-table-column label="最新文章" >
                <template slot-scope="scope">
                    <span class="title">{{ scope.row.a_title }}</span>
                </template>
            </el-table-column>
             <el-table-column  width="150">
                <template slot-scope="scope">
                    <span class="desc">{{ scope.row.a_time }}</span>
                </template>
            </el-table-column>
            <el-table-column width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total.sync="dataTotal">
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      dataTotal: 100,
      tableData: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      this.setArticle(row);
      this.$router.push({ path: '/user/articledetail' });
    },
    handleCurrentChange(val) {
      axios.get(this.$api.getArticlelist + `/${val}`).then(
        response => {
          // success callback
          console.log(response);
          this.dataTotal = response.data.total;
          this.tableData = response.data.list;
          this.tableData.forEach(item => {
             item.a_time=this.$util.dateFormat(item.a_datetime,true);
        });
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    ...mapMutations({
      setArticle: 'SET_ARTICLE',
    }),
  },
  created() {
    axios.get(this.$api.getArticlelist + `/${this.currentPage}`).then(
      response => {
        // success callback
        console.log(response);
        this.dataTotal = response.data.total;
        this.tableData = response.data.list;
        this.tableData.forEach(item => {
             item.a_time=this.$util.dateFormat(item.a_datetime,true);
        });
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
.u-article
    margin-top: 55px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    .el-table
        min-height: 500px
        .title, .desc
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            margin-left: 10px
    .pagination
        text-align: center
</style>
