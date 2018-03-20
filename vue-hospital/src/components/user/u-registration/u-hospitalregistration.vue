<template>
  <div class="u-hospitalregistration">
    <el-row>
      <el-col :span="24">
        <div class="choose">
          <div class="chooseitem">
            <span>医院类型</span>
            <el-radio-group v-model="type" size="small" @change="chooseChange">
              <el-radio label="全部" border>全部</el-radio>
              <el-radio label="公立" border>公立</el-radio>
              <el-radio label="私立" border>私立</el-radio>
            </el-radio-group>
          </div>
          <div class="chooseitem">
            <span>医院地区</span>
            <el-radio-group v-model="district" size="small" @change="chooseChange">
              <el-radio label="全部" border>全部</el-radio>
              <el-radio :label="item.name" border v-for="item in districts" :key="item.name">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="chooseitem">
            <span>医院等级</span>
            <el-radio-group v-model="rank" size="small" @change="chooseChange">
              <el-radio label="全部" border>全部</el-radio>
              <el-radio label="三级" border>三级医院</el-radio>
              <el-radio label="二级" border>二级医院</el-radio>
              <el-radio label="一级" border>一级医院</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="hospitallist">
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
                      </h2>
                      <p>
                        <i class="el-icon-hospital-phone"></i>
                        <span>{{scope.row.h_phone}}</span>
                      </p>
                      <p>
                        <i class="el-icon-hospital-address"></i>
                        <span>{{scope.row.h_address}}</span>
                      </p>
                      <p>
                        <i class="el-icon-hospital-district"></i>
                        <span>{{scope.row.h_district}}</span>
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column width="150" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="registration(scope.$index, scope.row)">马上预约</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total.sync="dataTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
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
      type: '全部',
      district: '全部',
      rank: '全部',
      districts: [],
    };
  },
  methods: {
    chooseChange(val) {
      axios
        .get(
          this.$api.gethospitallistbychoose +
            `/${this.currentPage}/${this.type}/${this.district}/${this.rank}`
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
    registration(index, row) {
      this.setHospital(row);
      this.setMenu('0');
      this.$router.push({ path: '/user/hospital' });
    },
    handleCurrentChange(val) {
      axios
        .get(
          this.$api.gethospitallistbychoose +
            `/${this.currentPage}/${this.type}/${this.district}/${this.rank}`
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
      setHospital: 'SET_HOSPITAL',
      setMenu: 'SET_MENU',
    }),
  },
  created() {
    var districts = require('../../../assets/district.json');
    this.districts = districts.district;
    axios
      .get(
        this.$api.gethospitallistbychoose +
          `/${this.currentPage}/${this.type}/${this.district}/${this.rank}`
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
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.u-hospitalregistration
  margin-top: 55px
  .el-col
    .choose
      border-radius: 4px
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
      padding: 10px
      .chooseitem
        padding-top: 10px
        padding-left: 10px
        span
          font-weight: 600
          margin-right: 10px
        &:last-child
          padding-bottom: 10px
    .hospitallist
      border-radius: 4px
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
      padding: 10px
      margin-top: 10px
      .el-pagination
        text-align: center
      .h_image
        width: 100%
        height: 165px
      .hospital-detail
        padding-left: 20px
        .el-tag
          &:first-child
            margin-left: 20px
        h2
          margin-top: 12px
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
