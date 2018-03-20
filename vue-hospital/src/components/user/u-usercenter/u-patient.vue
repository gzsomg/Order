<template>
  <div class="patient">
    <div v-if="isEmpty"></div>
    <div v-else>
      <div v-for="item in patients" :key="item.p_id" class="patient">
        <p class="patientname">{{item.p_name}}
          <el-tag size="small">{{item.p_gender}}</el-tag>
          <el-tag size="small" type="success">{{item.p_age}}岁</el-tag>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="patientEdit(item)">编辑</el-button>
        </p>
        <p class="patientphone">联系电话: {{item.p_phone}}
          <el-button type="warning" size="small" icon="el-icon-delete" @click="patientDelete(item)">删除</el-button>
        </p>
        <p>身份证号: {{item.p_idcard}}</p>
        <p>医保卡号: {{item.p_medicarecard}}</p>
      </div>
    </div>

    <el-button type="warning" round class="patientnew" @click="patientNew">添加新患者</el-button>

  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      user: [],
      isEmpty: true,
      patients: [],
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
            }
          },
          response => {
            console.log(response);
            // error callback
          }
        );
      }
    },
    patientNew() {
      this.$router.push({ path: '/user/patientedit' });
    },
    patientEdit(patient) {
      this.setPatient(patient);
      this.$router.push({ path: '/user/patientedit' });
    },
    patientDelete(patient) {
      axios.delete(this.$api.patientdelete + `/${patient.p_id}`).then(
        response => {
          // success callback
          console.log(response);
          this._getDetail();
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    ...mapMutations({
      setPatient: 'SET_PATIENT',
    }),
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.patient
  margin-top: 10px
  .patientnew
    margin-top: 10px
    float: right
  .patient
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    border-radius: 5px
    padding: 10px 20px 20px 20px
    margin: 10px
    min-width: 390px
    display: inline-block
    .patientname
      font-size: larger
      .el-tag
        margin-left: 10px
      .el-button
        float: right
        margin: 5px
    .patientphone
      .el-button
        float: right
        margin: 5px
</style>
