<template>
  <div class="hospitalList">
    <el-input v-model="searchkey" placeholder="请输入关键字...">
      <el-button type="primary" @click="Search" slot="prepend" class="dpsearch">查 找 医 院</el-button>
    </el-input>
    <el-table :data="tableData" class="updateTable">
      <el-table-column label="医院名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.h_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院地区" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.h_district }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院等级" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.h_rank }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院类型" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.h_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院地址">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.h_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      axios.get(this.$api.gethospitallist + `/${this.currentPage}/${key}`).then(
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
      this.setHospital(row);
      this.$router.push({ path: '/admin/hospitaledit' });
    },
    handleDelete(index, row, tableData) {
      axios.delete(this.$api.hospitaldelete + `/${row.h_id}`).then(
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
      axios.get(this.$api.gethospitallist + `/${val}/${key}`).then(
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
      setHospital: 'SET_HOSPITAL',
    }),
  },
  created() {
    var key = this.searchkey;
    if (this.searchkey === '') {
      key = 'nokey';
    }
    axios.get(this.$api.gethospitallist + `/${this.currentPage}/${key}`).then(
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
.hospitalList
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
    .el-table__row
      padding: 5px 0
  .pagination
    margin-top: 13px
    text-align: center
</style>