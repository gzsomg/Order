<template>
  <div class="hospitalEdit">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="医院名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="医院电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="医院地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="医院类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="公立"></el-radio>
          <el-radio label="私立"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医院等级" prop="rank">
        <el-select v-model="form.rank" placeholder="请选择医院等级">
          <el-option label="三级甲等" value="三级甲等"></el-option>
          <el-option label="三级乙等" value="三级乙等"></el-option>
          <el-option label="二级甲等" value="二级甲等"></el-option>
          <el-option label="二级乙等" value="二级乙等"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院地区" prop="district">
        <el-select v-model="form.district" placeholder="请选择医院地区">
          <el-option v-for="item in districts.district" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医院简介">
        <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 6, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item label="医院图片">
        <el-upload class="hospital-uploader" :data="{id: form.id,oldavatar: form.img}" :action="actions" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img :src="imageUrl" class="messhospital">

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
      districts: '',
      form: {
        id: '',
        name: '',
        phone: '',
        address: '',
        district: '',
        description: '',
        type: '',
        rank: '',
        img: '',
      },
      actions: '',
      imageUrl: '',
      rules: {
        name: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入医院联系电话', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入医院地址', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择医院类型', trigger: 'change' },
        ],
        rank: [
          { required: true, message: '请选择医院等级', trigger: 'change' },
        ],
        district: [
          { required: true, message: '请选择医院地区', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      console.log(this.form);

      if (this.hospital.h_id) {
        this.districts = require('../../../assets/district.json');
        this.form.id = this.hospital.h_id;
        this.form.name = this.hospital.h_name;
        this.form.phone = this.hospital.h_phone;
        this.form.address = this.hospital.h_address;
        this.form.district = this.hospital.h_district;
        this.form.description = this.hospital.h_description;
        this.form.type = this.hospital.h_type;
        this.form.rank = this.hospital.h_rank;
        this.form.img = this.hospital.h_img;
        this.actions = this.$api.uploadhospital;
        if (this.form.img.length > 0)
          this.imageUrl = this.$api.hospitalimg + this.form.img;
        else this.imageUrl = this.$api.hospitalimg + 'default.jpg';
      } else {
        this.$router.push('/admin/hospitallist');
        return;
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.form.img = res.fields.newavatar;
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
          axios.put(this.$api.hospitalupdate, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/admin/hospitallist' });
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
    ...mapGetters(['hospital']),
  },
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.hospitalEdit
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .messhospital
    width: 200px
    height: 200px
</style>