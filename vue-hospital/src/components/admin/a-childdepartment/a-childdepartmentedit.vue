<template>
  <div class="departmentEdit">
    <el-form ref="childDepartmentForm" :model="childDepartmentForm" :rules="rules" label-width="120px">
      <el-form-item label="子科室名称" prop="name">
        <el-input v-model="childDepartmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="所属科室名称">
         <el-select v-model="childDepartmentForm.departmentId" placeholder="请选择">
         <el-option
          v-for="item in departmentList"
           :key="item.d_id"
           :label="item.d_name"
           :value="item.d_id">
       </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="子科室简介">
        <el-input type="textarea" v-model="childDepartmentForm.description" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('childDepartmentForm')">提交</el-button>
        <el-button @click="resetForm('childDepartmentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import Qs from 'qs';
export default {
  data() {
    return {
      childDepartmentForm: {
        id: '',
        name: '',
        description: '',
        departmentId: '',
      },
      departmentList: [],
      rules: {
        name: [
          { required: true, message: '请输入子科室名称', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    console.log(this.childdepartment);
    if (this.childdepartment.d_id) {
      this.childDepartmentForm.id = this.childdepartment.s_id;
      this.childDepartmentForm.name = this.childdepartment.s_name;
      this.childDepartmentForm.description = this.childdepartment.s_description;
      this.childDepartmentForm.departmentId = this.childdepartment.d_id;
    } else {
      this.$router.push('/admin/departmentlist');
      return;
    }
    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      this.hospitalId = this.admin.h_id;
      var key = 'nokey';
      axios
        .get(
          this.$api.getalldepartmentList +
            `/${this.hospitalId}`
        )
        .then(
          response => {
            // success callback
            console.log(response);
            this.departmentList = response.data.department;
          },
          response => {
            console.log(response);
            // error callback
          }
        );
    }
  },
  methods: {
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.childDepartmentForm);
          axios.put(this.$api.childdepartmentupdate, formData).then(
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
      this.childDepartmentForm.name = '';
      this.childDepartmentForm.description = '';
    },
  },
  computed: {
    ...mapGetters(['childdepartment']),
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
