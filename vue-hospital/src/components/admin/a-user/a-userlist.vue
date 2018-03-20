<template>
  <div class="userList">
    <el-input v-model="searchkey" placeholder="请输入关键字...">
      <el-button type="primary" @click="Search" slot="prepend" class="dpsearch">查 找 用 户</el-button>
    </el-input>
    <el-table :data="tableData" class="updateTable">
      <el-table-column label="用户名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.u_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="deDesc">{{ scope.row.u_phone }}</span>
        </template>
      </el-table-column>
       <el-table-column label="邮箱" >
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="deDesc">{{ scope.row.u_email }}</span>
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
      searchkey: '',
      currentPage: 1,
      pagesize: 10,
      dataTotal: 100,
      tableData: [],
    };
  },
  methods: {
    Search(event) {
      console.log(this.searchkey);
      var key = this.searchkey;
      if (this.searchkey === '') {
        key = 'nokey';
      }
      this.currentPage = 1;
      axios.get(this.$api.getuserlist + `/${this.currentPage}/${key}`).then(
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
    handleEdit(index, row) {
      this.setUser(row);
      this.$router.push({ path: '/admin/userdetail' });
    },
    handleDelete(index, row, tableData) {
      axios.delete(this.$api.userdelete + `/${row.u_id}`).then(
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
      var key = this.searchkey;
      if (this.searchkey === '') {
        key = 'nokey';
      }
      axios.get(this.$api.getuserlist + `/${val}/${key}`).then(
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
      setUser: 'SET_USER',
    }),
  },
  created() {
    var key = this.searchkey;
    if (this.searchkey === '') {
      key = 'nokey';
    }
    axios.get(this.$api.getuserlist + `/${this.currentPage}/${key}`).then(
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
.userList
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .dpsearch
    padding: 0 20px
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