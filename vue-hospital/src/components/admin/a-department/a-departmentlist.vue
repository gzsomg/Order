<template>
  <div class="departmentList">
    <el-input v-model="searchkey" placeholder="请输入关键字...">
      <el-button type="primary" @click="Search" slot="prepend" class="dpsearch">查 找 科 室</el-button>
    </el-input>
    <el-table :data="tableData" class="updateTable" row-key="d_id" :expand-row-keys="expands" @row-click="rowClick">
      <el-table-column type="expand" width="30">
        <template slot-scope="props" >
          <el-table :data="childtableData" >
            <el-table-column width="180" label="子科室名称">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.s_name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="子科室介绍">
              <template slot-scope="scope">
                <span style="margin-left: 10px" class="deDesc">{{ scope.row.s_description }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleChildEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleChildDelete(scope.$index, scope.row,childtableData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="科室名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.d_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室介绍">
        <template slot-scope="scope">
          <span style="margin-left: 10px" class="deDesc">{{ scope.row.d_description }}</span>
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
      hospitalId: null,
      tableData: [],
      childtableData: [],
      expands: [],
    };
  },
  methods: {
    rowClick(row, event, column) {
      if (this.expands[0] == row.d_id) {
        this.expands.pop();
      } else {
        this.expands.pop();
        this.expands.push(row.d_id);
      }

      axios.get(this.$api.getChildDepartmentList + `/${row.d_id}`).then(
        response => {
          // success callback
          this.childtableData = response.data.smalldepartment;
          console.log(this.childtableData);
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
          this.$api.getdepartmentlist +
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
      this.setDepartment(row);
      this.$router.push({ path: '/admin/departmentedit' });
    },
    handleChildEdit(index, row) {
      this.setChildDepartment(row);
      this.$router.push({ path: '/admin/childdepartmentedit' });
    },
    handleDelete(index, row, tableData) {
      axios.delete(this.$api.departmentdelete + `/${row.d_id}`).then(
        response => {
          // success callback
          console.log(response);
          tableData.splice(index, 1);
          this.dataTotal--;
          // this.$router.go('/admin/departmentlist');  刷新
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    handleChildDelete(index, row, tableData) {
      axios.delete(this.$api.childdepartmentdelete + `/${row.s_id}`).then(
        response => {
          // success callback
          console.log(response);
          tableData.splice(index, 1);
          // this.$router.go('/admin/departmentlist');  刷新
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
        .get(this.$api.getdepartmentlist + `/${this.hospitalId}/${val}/${key}`)
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
      setDepartment: 'SET_DEPARTMENT',
      setChildDepartment: 'SET_CHILDDEPARTMENT'
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
          this.$api.getdepartmentlist +
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
<style  lang="stylus" rel="stylesheet/stylus">
.departmentList
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .dpsearch
    padding: 0 20px
  .updateTable
    width: 98%
    margin-top: 5px
    border-radius: 4px
    .el-table__expanded-cell[class*=cell]
      padding: 0px
      margin: 0px
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