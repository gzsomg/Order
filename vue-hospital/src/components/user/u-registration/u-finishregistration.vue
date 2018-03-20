<template>
  <div class="finishregistration">
    <h2>就诊信息确认</h2>
    <h3>就诊序号:{{Register.order}}</h3>
    <h3>就诊医生：</h3>
    <div class="expertmessage">
      <h4> {{Register.expert.e_name}}
        <el-tag size="small">{{Register.expert.e_gender}}</el-tag>
        <el-tag size="small" type="success">{{Register.expert.e_professor}}</el-tag>
      </h4>
      <p>{{Register.expert.e_phone}}</p>
      <span>{{Register.expert.e_description}}</span>
    </div>
    <h3>就诊患者选择:</h3>
    <div>
      <div class="expertmessage" v-for="item in patients" :key="item.p_id">
        <el-radio :label="item.p_id" v-model="radio">

          <span class="patientname">{{item.p_name}}
            <el-tag size="small">{{item.p_gender}}</el-tag>
            <el-tag size="small" type="success">{{item.p_age}}岁</el-tag>
          </span>
          <span>联系电话: {{item.p_phone}}</span>
          <span> 身份证号: {{item.p_idcard}}</span>
          <span> 医保卡号: {{item.p_medicarecard}}</span>

        </el-radio>
      </div>
    </div>

    <el-button type="warning" round class="patientnew" v-if="isEmpty==true" @click="patientNew">请添加患者</el-button>
    <div class="submit">
      <el-button type="primary" round @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      user: [],
      isEmpty: true,
      patients: [],
      Register: [],
      radio: 0,
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (sessionStorage.getItem('user')) {
        this.user = Qs.parse(sessionStorage.getItem('user'));
        axios.get(this.$api.getpatientsbyuser + `/${this.user.u_id}`).then(
          response => {
            console.log(response.data.patients);
            this.patients = response.data.patients;
            if (this.patients.length > 0) {
              this.isEmpty = false;
              this.radio = this.patients[0].p_id;
            }
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
      console.log(this.register);
      if (this.register.order) {
        this.Register = this.register;
      } else {
        this.$router.push('/user/registration');
        return;
      }
    },
    patientNew() {
      this.$router.push({ path: '/user/patientedit' });
    },
    submit() {
      const message = {
        r_datetime: this.Register.date,
        e_id: this.Register.expert.e_id,
        p_id: this.radio,
        r_order: this.Register.order,
        r_state: '等待就诊',
      };
      if (this.radio>0) {
        var formData = Qs.stringify(message);
        axios.post(this.$api.registernew, formData).then(
          response => {
            // success callback
            console.log(response);
            this.$nextTick(() => {
              if (response.data === 1) {
                this.$router.push({ path: '/user/registrationlist' });
              }
            });
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
    },
  },
  computed: {
    ...mapGetters(['register']),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.finishregistration
  margin-top: 55px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  min-height: 450px
  .submit
    width: 100%
    text-align: center
  .expertmessage
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    border-radius: 5px
    padding:10px
    margin: 10px
    width: 94% 
    span
      margin-right: 20px
    .patientname
      font-size: larger
      .el-tag
        margin-left: 10px
</style>
