<template>
  <div class="adminEdit">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="管理员名称" prop="a_name">
        <el-input v-model="form.a_name"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="a_password">
        <el-input v-model="form.a_password"></el-input>
      </el-form-item>
      <el-form-item label="所属医院" prop="h_name">
        <el-select v-model="form.h_id" placeholder="请选择医院">
          <el-option
           v-for="item in hospitals"
           :key="item.h_id"
           :label="item.h_name"
           :value="item.h_id">
       </el-option>
        </el-select>
      </el-select>
      </el-form-item>
      <el-form-item label="头像">
       <el-upload class="avatar-uploader" :data="{aid: form.a_id,oldavatar: form.a_avatar}" :action="actions" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
       <img :src="imageUrl" class="messavatar">
    
    </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
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
      hospitals: [],
      form: {},
      actions:'',
      imageUrl: '',
      rules: {
        a_name: [{ required: true, message: '请输入管理员名称', trigger: 'blur' }],
        a_password: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' },
        ],
        h_name: [
          { required: true, message: '请选择医院', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (this.admin.a_id) {
        this.form= this.admin;
        this.actions = this.$api.uploadavatar;
        if(this.form.a_avatar.length>0)
        this.imageUrl = this.$api.avatar + this.form.a_avatar;
        else
        this.imageUrl = this.$api.avatar + 'default.jpg';
        axios.get(this.$api.hospitallist).then(response=>{
            this.hospitals=response.data.hospitals;
        });
      } else {
        this.$router.push('/admin/adminlist');
        return;
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.a_avatar = res.fields.newavatar;
     // sessionStorage.setItem('admin', Qs.stringify(this.admin));
      this.imageUrl = res.fields.newavatar;
      this.imageUrl = URL.createObjectURL(file.raw);
     // this.$router.go(0);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      console.log(file);
      return isJPG && isLt2M;
    },
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.form);
          axios.put(this.$api.adminupdate, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/admin/adminlist' });
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
      this.form.description = '';
    },
  },
  computed: {
    ...mapGetters(['admin']),
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.adminEdit
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .messavatar
    width: 200px;
    height: 200px; 
</style>