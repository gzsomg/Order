<template>
  <div class="u-registration">
    <el-card>
      <div slot="header">
        <h2 class="h_name">{{ hospitalAndDepartment.h_name }}</h2>
      </div>
      <el-row>
        <el-col :span="6">
          <img :src="hospitalAndDepartment.h_img" class="h_image">
        </el-col>
        <el-col :span="18">
          <div class="hospital-detail">

            <p>
              <i class="el-icon-hospital-department"></i>
              <span> {{hospitalAndDepartment.d_name}} {{hospitalAndDepartment.s_name}}</span>
            </p>
            <p>
              <i class="el-icon-hospital-type"></i>
              <span>{{hospitalAndDepartment.h_type}}</span>
            </p>
            <p>
              <i class="el-icon-hospital-phone"></i>
              <span>{{hospitalAndDepartment.h_phone}}</span>
            </p>
            <p>
              <i class="el-icon-hospital-address"></i>
              <span>{{hospitalAndDepartment.h_address}}</span>
            </p>
            <p>
              <i class="el-icon-hospital-notice"></i>
              <span>{{hospitalAndDepartment.s_description}}</span>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">
        <h2 class="h_name">{{ hospitalAndDepartment.s_name}}全部人员排班信息</h2>
      </div>
      <table>
        <tr v-for="(expert,expertindex)  in experts" :key="expert.e_id">
          <td class="expertmessage">
            <h4> {{expert.e_name}}
              <el-tag size="small">{{expert.e_gender}}</el-tag>
              <el-tag size="small" type="success">{{expert.e_professor}}</el-tag>
            </h4>
            <p>{{expert.e_phone}}</p>
            <span>{{expert.e_description}}</span>
          </td>
          <td>
            <div class="date">
              <el-button type="warning">上午</el-button>
              <el-button type="warning">下午</el-button>
            </div>
            <div v-for="(item,index) in dates" class="date">
              <el-button type="success" class="datetime">{{item.date}}<br/> {{item.weekday}}</el-button>
              <el-button type="warning" v-if="registers.registers[index].morning>4" disabled plain>满额</el-button>
              <el-button type="primary" v-else plain @click="registertime(index,expert,true,registers.registers[index].morning)">预约{{5-registers.registers[index].morning}}</el-button>
              <el-button type="warning" v-if="registers.registers[index].afternoon>4" disabled plain>满额</el-button>
              <el-button type="primary" v-else plain @click="registertime(index,expert,false,registers.registers[index].afternoon)">预约{{5-registers.registers[index].afternoon}}</el-button>
            </div>
          </td>
        </tr>
      </table>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      hospitalAndDepartment: '',
      Childdepartment: [],
      experts: [],
      dates: [],
      registers: {},
    };
  },
  methods: {
    _getDetail() {
      if (this.childdepartment.s_id) {
        this.Childdepartment = this.childdepartment;

        for (var i = 0; i < 7; i++) {
          var date = new Date();
          this.dates[i] = this.$util.getDay(i);
        }
        axios
          .get(
            this.$api.gethospanddepabychild + `/${this.Childdepartment.s_id}`
          )
          .then(
            response => {
              this.hospitalAndDepartment = response.data.result[0];
              if (this.hospitalAndDepartment.h_img.length > 0)
                this.hospitalAndDepartment.h_img =
                  this.$api.hospitalimg + this.hospitalAndDepartment.h_img;
              else
                this.hospitalAndDepartment.h_img =
                  this.$api.hospitalimg + 'default.jpg';
            },
            response => {
              console.log(response);
              // error callback
            }
          );
        axios
          .get(this.$api.getexpertbychild + `/${this.childdepartment.s_id}`)
          .then(
            response => {
              // success callback

              this.experts = response.data.expert;

              this.experts.forEach(item => {
                axios.get(this.$api.getregisterbyexpert + `/${item.e_id}`).then(
                  response => {
                    // success callback
                    this.registers = response.data;
                    console.log(this.registers);
                  },
                  response => {
                    console.log(response);
                    // error callback
                  }
                );
              });
            },
            response => {
              console.log(response);
              // error callback
            }
          );
      } else {
        this.$router.push('/user/hospitalregistration');
        return;
      }
    },
    registertime(time, expert, isMorning, order) {
      var date = new Date();
      if (isMorning) {
        order++;
      } else {
        order = order+6;
      }
      date = this.$util.getDayTime(time, isMorning, order);
      var register = {
        date: date,
        expert: expert,
        order: order,
      };
      this.setRegister(register);
      this.$router.push('/user/finishregistration');
    },
    ...mapMutations({
      setRegister: 'SET_REGISTER',
    }),
  },
  created() {
    this._getDetail();
  },
  computed: {
    ...mapGetters(['childdepartment']),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.u-registration
  margin-top: 55px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .el-card
    margin: 5px 0
    .expertmessage
      width: 220px
    .date
      display: inline-block
      .datetime
        padding: 10px 0
      .el-button
        width: 90px
        border: 0
        height: 60px
        margin: 2px
        display: block
        border-radius: 0
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
