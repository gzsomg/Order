<template>
    <div class="u-hospital">
        <el-tabs type="border-card">
            <el-tab-pane label="预约挂号">
                <el-row>
                    <el-col :span="17">
                        <div class="department-list">
                            <h1>科室列表</h1>
                            <div v-for="item in departments" :key="item.d_id" class="childdepartment">
                                <h2>{{item.d_name}}</h2>
                                <a v-for="department in item.data" :key="department.d_id" @click="choosedepartment(department)">{{department.s_name}}</a>
                            </div>

                        </div>
                    </el-col>
                    <el-col :span="7">
                        <el-card>
                            <div slot="header">
                                <h3 class="h_name">{{ Hospital.h_name }}</h3>
                            </div>

                            <img :src="Hospital.h_img" class="h_image">

                            <div class="hospital-detail">
                                <p>
                                    <i class="el-icon-hospital-rank"></i>
                                    <span>{{Hospital.h_rank}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-type"></i>
                                    <span>{{Hospital.h_type}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-phone"></i>
                                    <span>{{Hospital.h_phone}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-address"></i>
                                    <span>{{Hospital.h_address}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-district"></i>
                                    <span>{{Hospital.h_district}}</span>
                                </p>
                            </div>

                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="医院介绍">
                <el-card>
                    <div slot="header">
                        <h2 class="h_name">{{ Hospital.h_name }}</h2>
                    </div>
                    <el-row>
                        <el-col :span="6">
                            <img :src="Hospital.h_img" class="h_image">
                        </el-col>
                        <el-col :span="18">
                            <div class="hospital-detail">
                                <p>
                                    <i class="el-icon-hospital-rank"></i>
                                    <span>{{Hospital.h_rank}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-type"></i>
                                    <span>{{Hospital.h_type}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-phone"></i>
                                    <span>{{Hospital.h_phone}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-address"></i>
                                    <span>{{Hospital.h_address}}</span>
                                </p>
                                <p>
                                    <i class="el-icon-hospital-district"></i>
                                    <span>{{Hospital.h_district}}</span>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                    <div v-html="compiledMarkdown"></div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="医院留言">
                <el-button type="primary" @click="publishComment()" class="publishComment">发表留言</el-button>
                <el-table :data="tableData" stripe class="updateTable">
                    <el-table-column label="最新留言">
                        <template slot-scope="scope">
                            <p>
                                <span class="u_name">{{ scope.row.u_name }}</span>
                                <span class="c_time">{{ scope.row.c_time }}</span>
                            </p>
                            <p class="c_description">{{ scope.row.c_description }}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination class="pagination" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total.sync="dataTotal">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      Hospital: '',
      departments: [],
      currentPage: 1,
      pagesize: 10,
      dataTotal: 100,
      tableData: [],
    };
  },
  methods: {
    _getDetail() {
      if (this.hospital.h_id) {
        this.Hospital = this.hospital;
        axios
          .get(this.$api.getdepaandchildbyhospital + `/${this.Hospital.h_id}`)
          .then(
            response => {
              // success callback
              var result = response.data.result;
              let map = {},
                dest = [];
              for (let i = 0; i < result.length; i++) {
                const element = result[i];
                if (!map[element.d_name]) {
                  dest.push({
                    d_name: element.d_name,
                    data: [element],
                  });
                  map[element.d_name] = element;
                } else {
                  for (let j = 0; j < dest.length; j++) {
                    let dj = dest[j];
                    if (dj.d_name === element.d_name) {
                      dj.data.push(element);
                      break;
                    }
                  }
                }
              }
              console.log(dest);
              this.departments = dest;
            },
            response => {
              console.log(response);
              // error callback
            }
          );
        axios
          .get(
            this.$api.getcommentlist +
              `/${this.Hospital.h_id}/${this.currentPage}`
          )
          .then(
            response => {
              // success callback
              console.log(response);
              this.dataTotal = response.data.total;
              this.tableData = response.data.list;
              this.tableData.forEach(item => {
                item.c_time = this.$util.dateFormat(item.c_datetime, false);
              });
            },
            response => {
              console.log(response);
              // error callback
            }
          );
      } else {
        this.$router.push('/user/home');
        return;
      }
    },
    publishComment() {
      this.setHospital(this.Hospital);
      this.$router.push('/user/publishcomment');
    },
    handleCurrentChange(val) {
      axios
        .get(
          this.$api.getcommentlist +
            `/${this.Hospital.h_id}/${this.currentPage}`
        )
        .then(
          response => {
            // success callback
            console.log(response);
            this.dataTotal = response.data.total;
            this.tableData = response.data.list;
            this.tableData.forEach(item => {
              item.c_time = this.$util.dateFormat(item.c_datetime, false);
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
    },
    choosedepartment(department) {
      this.setChildDepartment(department);
      this.$router.push({ path: '/user/registration' });
    },
    ...mapMutations({
      setChildDepartment: 'SET_CHILDDEPARTMENT',
      setHospital: 'SET_HOSPITAL',
    }),
  },
  created() {
    this._getDetail();
  },
  computed: {
    ...mapGetters(['hospital']),
    compiledMarkdown: function() {
      return marked(this.Hospital.h_description, { sanitize: true });
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.u-hospital
    margin-top: 55px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    .publishComment
        position: absolute
        right: 20px
        z-index: 10
    .el-table
        min-height: 500px
        .u_name
            float: left
            font-size: larger
            color: #1fa4f0
        .c_time
            float: right
        .c_description
            clear: both
            padding-top: 5px
            padding-left: 5px
    .pagination
        text-align: center
    .department-list
        padding: 20px
        margin-right: 10px
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
        h1
            color: #1fa4f0
        .childdepartment
            width: 100%
            a
                display: inline-block
                width: 33%
                height: 30px
            a:hover
                display: inline-block
                color: #409EFF
                width: 33%
                font-weight: bolder
    .el-card
        .h_name
            margin: 0px
        .h_image
            width: 100%
            border-radius: 5px
        .h_description
            padding-top: 20px
            font-size: 18px
        .hospital-detail
            padding: 0 30px
            p
                display: flex
                align-items: center
                i
                    color: #1fa4f0
                    font-size: x-large
                span
                    margin-left: 25PX
                    color: #888
                    font-size: large
</style>
