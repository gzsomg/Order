<template>
  <div class="adminmessage">
    <div class="msgheader">
      <span>{{hospitalname}}管理员</span>
    </div>
    <el-upload class="avatar-uploader" :data="{aid: admin.a_id,oldavatar: admin.a_avatar}" :action="actions" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img :src="imageUrl" class="messavatar">
      <el-button type="primary" round size="small">更改头像</el-button>
    </el-upload>
    <div class="msgitem">
      <el-row>
        <el-col :span="4">
          <span> 名称</span>
        </el-col>
        <el-col :span="6">
          <span> {{admin.a_name}}</span>
        </el-col>
        <el-col :span="6">
          <el-button type="text" size="mini" @click="nameDialogVisible = true">修改</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="msgitem">
      <el-row>
        <el-col :span="4">
          <span>类型</span>
        </el-col>
        <el-col :span="20">
          <span v-if="admin.a_type==1">系统管理员</span>
          <span v-else>医院管理员</span>
        </el-col>
      </el-row>
    </div>
    <div class="msgitem" v-if="admin.h_id">
      <el-row>
        <el-col :span="4">
          所属医院
        </el-col>
        <el-col :span="20">
          {{hospitalname}}
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" round @click="passwordDialogVisible = true">修改密码</el-button>

    <el-dialog title="修改名称" :visible.sync="nameDialogVisible" width="30%" center>
      <el-input v-model="fromdata.name" placeholder="请输入名称"></el-input>
      <div class="errmsg">{{Errmes}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sumbitName()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="30%" center>

      <el-input v-model="fromdata.newpassword" type="password"></el-input>
      <div class="errmsg">{{Errmes}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sumbitPassword()">确 定</el-button>
      </span>

      
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  data() {
    return {
      admin: [],
      hospitalname: '',
      imageUrl: '',
      actions: '',
      Errmes: '',
      nameDialogVisible: false,
      passwordDialogVisible: false,
      fromdata: {
        Id: '',
        name: '',
        newpassword: '',
      },
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (sessionStorage.getItem('admin')) {
        this.admin = Qs.parse(sessionStorage.getItem('admin'));
        if (this.admin.a_avatar.length > 0)
          this.imageUrl = this.$api.avatar + this.admin.a_avatar;
        else this.imageUrl = this.$api.avatar + 'default.jpg';
        this.actions = this.$api.uploadavatar;
        if (this.admin.h_id) {
          this.fromdata.Id = this.admin.a_id;
          var hospitalId = this.admin.h_id;
          axios.get(this.$api.gethospital + `/${hospitalId}`).then(
            response => {
              // success callback
              console.log(response);
              this.hospitalname = response.data.hospital.h_name;
            },
            response => {
              console.log(response);
              // error callback
            }
          );
        }
      }
    },
    cancel() {
      this.nameDialogVisible = false;
      this.passwordDialogVisible = false;
      this.fromdata.name = '';
      this.fromdata.newpassword = '';
      this.Errmes = '';
    },
    sumbitPassword() {
      if (this.fromdata.newpassword.length === 0) {
        this.Errmes = '请输入新密码';
      } else {
        this.passwordDialogVisible = false;
        var Data = Qs.stringify(this.fromdata);
        axios.put(this.$api.adminPasswordupdate, Data).then(
          response => {
            // success callback
            console.log(response);
            this.$nextTick(() => {
              this.Errmes = '';
              if (response.data === 1) {
                this.fromdata.newpassword = '';
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

    sumbitName() {
      if (this.fromdata.name.length === 0) {
        this.Errmes = '请输入名称';
      } else {
        this.nameDialogVisible = false;
        var Data = Qs.stringify(this.fromdata);
        axios.put(this.$api.adminNameupdate, Data).then(
          response => {
            // success callback
            console.log(response);
            this.$nextTick(() => {
              this.Errmes = '';
              if (response.data === 1) {
                this.admin.a_name = this.fromdata.name;
                sessionStorage.setItem('admin', Qs.stringify(this.admin));
                this.$router.go(0);
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
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.admin.a_avatar = res.fields.newavatar;
      sessionStorage.setItem('admin', Qs.stringify(this.admin));
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
.adminmessage
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .msgheader
    font-size: larger
  .avatar-uploader
    padding: 20px
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
