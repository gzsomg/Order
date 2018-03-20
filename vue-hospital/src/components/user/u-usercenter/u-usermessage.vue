<template>
    <div>
        <el-upload class="avatar-uploader" :data="{uid: user.u_id,oldavatar: user.u_avatar}" :action="actions" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img :src="imageUrl" class="messavatar">
            <el-button type="primary" round size="small">更改头像</el-button>
        </el-upload>
        <el-form ref="user" :model="user" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="u_name">
                <el-input v-model="user.u_name" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="u_phone">
                <el-input v-model="user.u_phone" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="u_email">
                <el-input v-model="user.u_email" :disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changemessage" v-if="disabled==true">修改资料</el-button>
                <el-button type="primary" @click="changepassword = true" v-if="disabled==true">修改密码</el-button>
                <el-button type="primary" v-if="disabled==false" @click="sumbitMessage('user')">确定</el-button>
                <el-button v-if="disabled==false" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
        <el-form :model="password" status-icon :rules="rules2" ref="password" label-width="100px" v-show="changepassword">
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="password.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="password.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbitPassword('password')">提交</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.password.checkPass !== '') {
          this.$refs.password.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.password.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      imageUrl: '',
      actions: '',
      disabled: true,
      changepassword: false,
      rules: {
        u_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        u_phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        u_email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      },
      password: {
        pass: '',
        checkPass: '',
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (sessionStorage.getItem('user')) {
        this.user = Qs.parse(sessionStorage.getItem('user'));
        if (this.user.u_avatar.length > 0)
          this.imageUrl = this.$api.avatar + this.user.u_avatar;
        else this.imageUrl = this.$api.avatar + 'default.jpg';
        this.actions = this.$api.userUploadavatar;
      }
    },
    cancel() {
      this.$router.go(0);
    },
    changemessage() {
      this.disabled = false;
    },
    sumbitPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.user.u_password = this.password.pass;
          var Data = Qs.stringify(this.user);
          axios.put(this.$api.userMessageupdate, Data).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  sessionStorage.setItem('user', Qs.stringify(this.user));
                  this.$router.go(0);
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

    sumbitMessage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var Data = Qs.stringify(this.user);
          axios.put(this.$api.userMessageupdate, Data).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  sessionStorage.setItem('user', Qs.stringify(this.user));
                  this.$router.go(0);
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
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.user.u_avatar = res.fields.newavatar;
      sessionStorage.setItem('user', Qs.stringify(this.user));
      this.imageUrl = res.fields.newavatar;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$router.go(0);
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
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.avatar-uploader
    padding: 20px
    margin-left: 50px  
    .el-upload, .el-upload--text
        text-align: left
    .messavatar
        text-align: left
        vertical-align: middle
        margin-right: 35px
        width: 30%
        border-radius: 50%
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
.msgitem
    padding: 15px
    font-size: larger
    vertical-align: middle
.errmsg
    font-size: small
    color: red
</style>
