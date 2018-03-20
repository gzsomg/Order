<template>
  <div class="patientEdit">
    <el-alert title="新增或修改患者信息，信息需真实有效" type="warning">
    </el-alert>
    <el-form ref="patientForm" :model="patientForm" :rules="rules" label-width="80px">
      <el-form-item label="患者名称" prop="p_name">
        <el-input v-model="patientForm.p_name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="p_phone">
        <el-input v-model="patientForm.p_phone"></el-input>
      </el-form-item>
      <el-form-item label="患者年龄" prop="p_age">
        <el-input v-model.number="patientForm.p_age"></el-input>
      </el-form-item>
      <el-form-item label="患者性别" prop="p_gender">
        <el-radio-group v-model="patientForm.p_gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证号" prop="p_idcard">
        <el-input v-model="patientForm.p_idcard"></el-input>
      </el-form-item>
      <el-form-item label="医保卡号" prop="p_medicarecard">
        <el-input v-model="patientForm.p_medicarecard"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editSubmit('patientForm')" v-if="isEdit">提交</el-button>
        <el-button type="primary" @click="newSubmit('patientForm')" v-else>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      patientForm: {
        p_gender: '男',
      },
      isEdit: false,
      rules: {
        p_name: [
          { required: true, message: '请输入患者名称', trigger: 'blur' },
        ],
        p_phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        p_age: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' },
        ],
        p_gender: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        p_idcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        p_medicarecard: [
          { required: true, message: '请输入医保卡号', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (this.patient.p_id) {
      this.isEdit = true;
      this.patientForm = this.patient;
    }
    this.setPatient([]);
    this.user = Qs.parse(sessionStorage.getItem('user'));
    this.patientForm.u_id = this.user.u_id;
  },
  methods: {
    newSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.patientForm);
          axios.post(this.$api.patientnew, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/user/usercenter' });
                }
              });
            },
            response => {
              console.log(response);
              // error callback
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    editSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.patientForm);
          axios.put(this.$api.patientupdate, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/user/usercenter' });
                }
              });
            },
            response => {
              console.log(response);
              // error callback
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    ...mapMutations({
      setPatient: 'SET_PATIENT',
    }),
  },
  computed: {
    ...mapGetters(['patient']),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.patientEdit
  margin-top: 55px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .el-alert
    margin-bottom: 10px 
</style>
