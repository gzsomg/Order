<template>
  <div class="hello">
    <form @submit.prevent="submit">
      姓名
      <div class="field">
        <input v-model="user.name" type="text">
      </div>
      密码
      <div class="field">
        <input v-model="user.password" type="text">
      </div>
      电话
      <div class="field">
        <input v-model="user.phone" type="text">
      </div>
      邮箱
      <div class="field">
        <input v-model="user.email" type="text">
      </div>
      <input type="submit" value="提交">
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
  data() {
    return {
      user: {
        name: 'ee',
        password: 'dd',
        phone: 'dddd',
        email: 'ddd',
      },
    };
  },
  methods: {
    submit: function(event) {
      var formData = Qs.stringify(this.user);
      // let config = {
      //   headers: {
      //      'Content-Type': 'application/x-www-form-urlencoded',
      //      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      //      }
      //  }
      console.log(formData);
      axios.post('http://127.0.0.1:7001/user/signup', formData).then(
        response => {
          // success callback
          console.log(response);
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
