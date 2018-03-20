<template>
  <div class="login">
    <el-row style="margin-top:100px;z-index: 1;">
      <el-col :model="user" :offset="8" :span="8">
        <el-card class="login-box">
          <el-form>
            <h1 class="title">欢迎使用</h1>
            <p class="login-box-msg">医院预约挂号平台</p>
            <el-form-item>
              <el-input type="text" v-model="user.name" placeholder="请输入用户名..."></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" placeholder="请输入密码..."></el-input>
            </el-form-item>
            <p v-show="msg">{{msg}}</p>
            <el-form-item>
              <el-radio v-model="user.type" label="1" checked="checked">用户</el-radio>
              <el-radio v-model="user.type" label="2">管理员</el-radio>
              <el-button type="primary" @click="login" class="submit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.login {
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

.login-box {
  background: rgba(0, 0, 0, 0.5);
  border: none;
}

.login-box-msg {
  color: #ffffff;
  text-align: center;
}

.login-box .title {
  color: #ffffff;
  text-align: center;
}
.submit {
  margin-left: 20px;
}
</style>
<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      user: {
        name: '',
        password: '',
        type: '1',
      },
      msg: '',
    };
  },
  methods: {
    login() {
      var formData = Qs.stringify(this.user);
      axios.post(this.$api.login, formData).then(
        response => {
          // success callback
          console.log(response);
          this.$nextTick(() => {
            if (response.data.errmsg) {
              this.msg = response.data.errmsg;
            } else {
              if (this.user.type === '1') {
                this.setUser(response.data);
                sessionStorage.setItem('user', Qs.stringify(response.data));
                this.$router.push({ path: '/Userindex' });
              } else {
                console.log('2');
                this.setUser(response.data);
                sessionStorage.setItem('admin', Qs.stringify(response.data));
                this.$router.push({ path: '/Adminindex' });
              }
            }
          });
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    ...mapMutations({
      setUser: 'SET_USER',
    }),
  },
};
</script>
