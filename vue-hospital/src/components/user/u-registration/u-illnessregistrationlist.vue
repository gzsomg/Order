<template>
    <div class="u-illnessregistrationlist">
        <div class="illness-top">
            <el-button type="primary" round>已选择：{{this.illness.i_name}}</el-button>
            <el-button type="text" @click="chooseIllness">选择其它疾病</el-button>
            <p>{{this.illness.i_description}}</p>
        </div>
        <el-table :data="tableData">
            <el-table-column label="医院列表">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="5">
                            <img :src="scope.row.h_img" class="h_image">
                        </el-col>
                        <el-col :span="19">
                            <div class="hospital-detail">
                                <h2>{{scope.row.h_name}}
                                    <el-tag type="warning" size="mini">{{scope.row.h_rank}}</el-tag>
                                    <el-tag type="success" size="mini">{{scope.row.h_type}}</el-tag>
                                    <el-button @click="choosedepartment(scope.row)" type="primary" size="medium">马上预约</el-button>
                                </h2>
                                <h3>{{scope.row.d_name}}&nbsp;|&nbsp;
                                    <span class="child">{{scope.row.s_name}}</span>
                                </h3>
                                <p>
                                    <i class="el-icon-hospital-phone"></i>
                                    <span>{{scope.row.h_phone}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-address"></i>
                                    <span>{{scope.row.h_address}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-article"></i>
                                    <span>{{scope.row.d_description}}</span>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
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
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      dataTotal: 100,
      tableData: [],
      districts: [],
      key: '',
    };
  },
  methods: {
    _getDetail() {
      if (this.illness.i_id) {
        this.key = this.illness.s_name;
        axios
          .get(
            this.$api.getchilddepartmentlistbyillness +
              `/${this.currentPage}/${this.key}`
          )
          .then(
            response => {
              // success callback
              console.log(response);
              this.dataTotal = response.data.total;
              this.tableData = response.data.list;
              this.tableData.forEach(item => {
                if (item.h_img.length > 0)
                  item.h_img = this.$api.hospitalimg + item.h_img;
                else item.h_img = this.$api.hospitalimg + 'default.jpg';
              });
              console.log(this.tableData);
            },
            response => {
              console.log(response);
              // error callback
            }
          );
      } else {
        this.$router.push('/user/illnessregistration');
        return;
      }
    },
    chooseIllness() {
      this.$router.push('/user/illnessregistration');
    },
    choosedepartment(department) {
      this.setChildDepartment(department);
      this.setMenu('0');
      this.$router.push({ path: '/user/registration' });
    },
    handleCurrentChange(val) {
      axios
        .get(
          this.$api.getchilddepartmentlistbyillness +
            `/${this.currentPage}/${this.key}`
        )
        .then(
          response => {
            // success callback
            console.log(response);
            this.dataTotal = response.data.total;
            this.tableData = response.data.list;
            this.tableData.forEach(item => {
              if (item.h_img.length > 0)
                item.h_img = this.$api.hospitalimg + item.h_img;
              else item.h_img = this.$api.hospitalimg + 'default.jpg';
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
    },
    ...mapMutations({
      setChildDepartment: 'SET_CHILDDEPARTMENT',
      setMenu: 'SET_MENU',
    }),
  },
  created() {
    this._getDetail();
  },
  computed: {
    ...mapGetters(['illness']),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.u-illnessregistrationlist
    margin-top: 55px
    border-radius: 4px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    padding: 10px
    .illness-top
        padding: 10px
        p
            font-size: 15px 
            color: #888
    .el-pagination
        text-align: center
    .h_image
        width: 100%
    .hospital-detail
        padding-left: 20px
        .el-tag
            &:first-child
                margin-left: 20px
        h2
            margin-top: 12px
            .el-button
                float: right
                margin-right: 15px
        .child
            color: #E6A23C
        p
            display: flex
            align-items: center
            i
                color: #1fa4f0
                font-size: x-large
            span
                margin-left: 20PX
                color: #888
</style>
