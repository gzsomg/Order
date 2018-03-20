<template>
  <div class="expertEdit">
    <el-form ref="expertForm" :model="expertForm" :rules="rules" label-width="80px">
      <el-form-item label="医生名称" prop="e_name">
        <el-input v-model="expertForm.e_name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
          <el-radio-group v-model="expertForm.e_gender">
           <el-radio label="男"></el-radio>
           <el-radio label="女"></el-radio>
         </el-radio-group>
     </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="expertForm.e_phone"></el-input>
      </el-form-item>
       <el-form-item label="等级">
    <el-select v-model="expertForm.e_professor" placeholder="等级">
      <el-option label="正高" value="正高"></el-option>
      <el-option label="副高" value="副高"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="科室">
    <el-cascader
    :options="options"
    :placeholder="placeholder"
    @active-item-change="handleItemChange"
    @change="handleChange"
    :props="props">
  </el-cascader>
  </el-form-item>
      <el-form-item label="医生简介">
        <el-input type="textarea" v-model="expertForm.e_description" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('expertForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import index, { mapGetters } from 'vuex';
import Qs from 'qs';
export default {
  data() {
    return {
      expertForm: {},
      options: [],
      props: {
        value: 'label',
        children: 'children',
      },
      department: {},
      placeholder: '',
      childdepartment: {},
      rules: {
        e_name: [
          { required: true, message: '请输入医生名称', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (this.expert.e_id) {
      this.expertForm = this.expert;
    } else {
      this.$router.push('/admin/expertlist');
      return;
    }

    if (sessionStorage.getItem('admin')) {
      this.admin = Qs.parse(sessionStorage.getItem('admin'));
      this.hospitalId = this.admin.h_id;
      var key = 'nokey';
      axios.get(this.$api.getalldepartmentList + `/${this.hospitalId}`).then(
        response => {
          // success callback
          var list = response.data.department;
          list.forEach(item => {
            item.value = item.d_id;
            item.label = item.d_name;
            item.children = [];
          });
          this.options = list;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    }
    axios
      .get(this.$api.getchilddepartmentbyexpert + `/${this.expert.s_id}`)
      .then(
        response => {
          // success callback
          console.log(response.data.arr);
          this.department = response.data.arr[0];
          this.childdepartment = response.data.arr[1];
          this.placeholder =
            this.department.d_name + ' / ' + this.childdepartment.s_name;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
  },
  methods: {
    handleChange(val) {
      console.log(val[1]);
      var arr=this.department.children;
      arr.forEach(item => {
        if (item.s_name == val[1]) {
          this.smalldepartment = item;
          this.expertForm.s_id = item.s_id;
        }
      });
    },
    handleItemChange(value) {
      var Num = 0,
        flag = false;
      var index = 0;
      this.options.forEach(item => {
        if (item.d_name == value && flag == false) {
          Num = item.d_id;
          this.department = item;
          flag = true;
        } else if (item.d_name != value && flag == false) {
          index++;
        }
      });
      axios.get(this.$api.getChildDepartmentList + `/${Num}`).then(
        response => {
          //success callback
          var list = response.data.smalldepartment;
          list.forEach(item => {
            item.value = item.s_id;
            item.label = item.s_name;
          });
          this.options[index].children = list;
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.expertForm);
          console.log(this.expertForm);
            axios.put(this.$api.expertupdate, formData).then(
              response => {
                // success callback
                console.log(response);
                this.$nextTick(() => {
                  if (response.data === 1) {
                    this.$router.push({ path: '/admin/expertlist' });
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
  },
  computed: {
    ...mapGetters(['expert']),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.expertEdit
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
</style>
