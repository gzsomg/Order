<template>
  <div class="articleList">
    <el-table :data="tableData" class="updateTable">
      <el-table-column label="文章标题" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.a_title }}</span>
        </template>
      </el-table-column>
        <el-table-column label="内容">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="deDesc">{{ scope.row.a_description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row,tableData)">删除</el-button>
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
      this.$router.push({ path: '/admin/articledetail' });
    },
    handleDelete(index, row, tableData) {
      axios.delete(this.$api.articledelete + `/${row.a_id}`).then(
        response => {
          // success callback
          console.log(response);
          tableData.splice(index, 1);
          this.dataTotal--;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    handleCurrentChange(val) {
      axios.get(this.$api.getArticlelist + `/${val}`).then(
        response => {
          // success callback
          console.log(response);
          this.dataTotal = response.data.total;
          this.tableData = response.data.list;
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
.articleList
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .updateTable
    width: 100%
    margin-top: 5px
    border-radius: 4px
    .deDesc
      width: 160px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    .el-table__row
      padding: 5px 0
  .pagination
    margin-top: 13px
    text-align: center
</style>