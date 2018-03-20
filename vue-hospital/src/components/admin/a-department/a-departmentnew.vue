<template>
  <div class="departmentEdit">
    <el-form ref="departmentForm" :model="departmentForm" :rules="rules" label-width="80px">
      <el-form-item label="科室名称" prop="name">
        <el-input v-model="departmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科室简介">
        <el-input type="textarea" v-model="departmentForm.description" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('departmentForm')">提交</el-button>
        <el-button @click="resetForm('departmentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  data() {
    return {
      departmentForm: {
        name: '',
        description: '',
        hospitalId: '',
      },
      rules: {
        name: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
      },
    };
  },
  created() {
    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      this.departmentForm.hospitalId = this.admin.h_id;
    }
  },
  methods: {
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.departmentForm);
          axios.post(this.$api.departmentnew, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/admin/departmentlist' });
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
    resetForm: function(form) {
      this.$refs[form].resetFields();
      this.departmentForm.description = '';
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.departmentEdit
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
</style>
