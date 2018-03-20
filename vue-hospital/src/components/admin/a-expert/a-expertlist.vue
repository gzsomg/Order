<template>
  <div class="expertList">
    <el-input v-model="searchkey" placeholder="请输入关键字...">
      <el-button type="primary" @click="Search" slot="prepend" class="dpsearch">查 找 医 生</el-button>
    </el-input>
    <el-table :data="tableData" class="updateTable" row-key="e_id" :expand-row-keys="expands" @row-click="rowClick">
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="性别">
            <span>{{ props.row.e_gender }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.e_phone }}</span>
          </el-form-item>
          <el-form-item label="等级">
            <span>{{ props.row.e_professor }}</span>
          </el-form-item>
          <el-form-item label="所属科室">
             <el-button size="mini" round type="primary" plain>{{department.d_name }}</el-button>
             <el-button size="mini" round type="success" plain> {{childdepartment.s_name}}</el-button>
          </el-form-item>
          <el-form-item label="介绍">
            <span>{{ props.row.e_description }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column label="医生名称" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.e_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生介绍">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="deDesc">{{ scope.row.e_description }}</span>
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
      searchkey: '',
      hospitalId: null,
      expands: [],
      department: {},
      childdepartment: {},
    };
  },
  methods: {
    rowClick(row, event, column) {
      if (this.expands[0] == row.e_id) {
        this.expands.pop();
      } else {
        this.expands.pop();
        this.expands.push(row.e_id);
      }

      axios.get(this.$api.getchilddepartmentbyexpert + `/${row.s_id}`).then(
        response => {
          // success callback
          console.log(response.data.arr);
          this.department = response.data.arr[0];
          this.childdepartment = response.data.arr[1];
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    Search(event) {
      console.log(this.searchkey);
      var key = this.searchkey;
      if (this.searchkey === '') {
        key = 'nokey';
      }
      this.currentPage = 1;
      axios
        .get(
          this.$api.getexpertList +
            `/${this.hospitalId}/${this.currentPage}/${key}`
        )
        .then(
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
      this.setExpert(row);
      this.$router.push({ path: '/admin/expertedit' });
    },
    handleDelete(index, row, tableData) {
      axios.delete(this.$api.expertdelete + `/${row.e_id}`).then(
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
      axios
        .get(this.$api.getexpertList + `/${this.hospitalId}/${val}/${key}`)
        .then(
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
      setExpert: 'SET_EXPERT',
    }),
  },
  created() {
    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      this.hospitalId = this.admin.h_id;
      var key = this.searchkey;
      if (this.searchkey === '') {
        key = 'nokey';
      }
      axios
        .get(
          this.$api.getexpertList +
            `/${this.hospitalId}/${this.currentPage}/${key}`
        )
        .then(
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
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.expertList
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 100px;
    margin-bottom: 0;
  }
</style>
