<template>
    <div class="commentForm">
        <el-form ref="commentForm" :model="commentForm" :rules="rules" label-width="80px">
            <el-form-item label="留言" prop="c_description">
                <el-input type="textarea" v-model="commentForm.c_description" :autosize="{ minRows: 20, maxRows: 30}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('commentForm')">提交</el-button>
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
      Hospital: '',
      commentForm: {
        c_description: '',
        u_id: '',
        h_id: '',
      },
      rules: {
        c_description: [
          { required: true, message: '请输入留言', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    if (sessionStorage.getItem('user')) {
      this.user = Qs.parse(sessionStorage.getItem('user'));
      this.commentForm.u_id = this.user.u_id;
    }
    if (this.hospital.h_id) {
      this.Hospital = this.hospital;
      this.commentForm.h_id = this.hospital.h_id;
    } else {
      this.$router.push('/user/home');
      return;
    }
  },
  computed: {
    ...mapGetters(['hospital']),
  },
  methods: {
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var formData = Qs.stringify(this.commentForm);
          axios.post(this.$api.publishcomment, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.setHospital(this.Hospital);
                  this.$router.push({ path: '/user/hospital' });
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
      setHospital: 'SET_HOSPITAL',
    }),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.commentForm
    margin-top: 55px
    padding: 13px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    min-height: 500px
</style>
