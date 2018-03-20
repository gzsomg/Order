<template>
  <div class="articleNew">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题" prop="a_title">
        <el-input v-model="form.a_title"></el-input>
      </el-form-item>
       <el-form-item label="内容" >
           <textarea :value="input" @input="update" :rows="20" class="description"></textarea>
           <div v-html="compiledMarkdown" class="descriptionshow"></div>
          </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <div id="editor">
</div>
  </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';

export default {
  data() {
    return {
      form: {},
      input: '',
      rules: {
        a_title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    },
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    onSubmit: function(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.form.a_description = this.input;
          var formData = Qs.stringify(this.form);
          axios.post(this.$api.articlenew, formData).then(
            response => {
              // success callback
              console.log(response);
              this.$nextTick(() => {
                if (response.data === 1) {
                  this.$router.push({ path: '/admin/articlelist' });
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
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.articleNew
  position: relative
  top: 60px
  margin: 13px
  padding: 13px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
  .description
    display: block
    resize: vertical
    padding: 5px 15px
    line-height: 1.5
    -webkit-box-sizing: border-box
    box-sizing: border-box
    width: 100%
    font-size: 14px
    color: #5a5e66
    background-color: #fff
    border: 1px solid #d8dce5
    border-radius: 4px
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1)
    transition: border-color .2s cubic-bezier(.645,.045,.355,1)
  .descriptionshow
    padding-left: 20px  
</style>
