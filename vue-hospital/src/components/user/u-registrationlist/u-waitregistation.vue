<template>
    <div class="waitregistation">
        <div v-if="isEmpty">
            <h2>暂无信息</h2>
        </div>
        <div v-else>
            <div v-for="(item,index) in registerlist" :key="item.r_id" class="registationlist">
                <el-row>
                    <el-col :span="8">
                        <p class="patientname">{{item.p_name}}
                            <el-tag size="small">{{item.p_gender}}</el-tag>
                            <el-tag size="small" type="success">{{item.p_age}}岁</el-tag>
                        </p>
                        <p class="patientphone">联系电话: {{item.p_phone}}
                        </p>
                        <p>身份证号: {{item.p_idcard}}</p>
                        <p>医保卡号: {{item.p_medicarecard}}</p>
                        <h4>就诊序号:{{item.r_order}}</h4>
                        <h4>就诊时间:{{item.r_datetime}}</h4>
                    </el-col>
                    <el-col :span="14">
                        <h4>{{item.h_name}} {{item.d_name}} {{item.s_name}} </h4>
                        <p class="patientname" h4>{{item.e_name}}
                            <el-tag size="small">{{item.e_gender}}</el-tag>
                            <el-tag size="small" type="success">{{item.e_professor}}</el-tag>
                        </p>
                        <p>{{item.e_phone}}</p>
                        <span>{{item.e_description}}</span>
                    </el-col>

                    <el-col :span="2">
                        <el-button type="warning" size="small" @click="cancel(item.r_id,index)">取消预约</el-button>
                        <div class="seal">
                            <span class="sealtext">等待</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      isEmpty: true,
      registerlist: [],
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    _getDetail() {
      if (sessionStorage.getItem('user')) {
        this.user = Qs.parse(sessionStorage.getItem('user'));
        axios
          .get(this.$api.registerlist + `/${this.user.u_id}/${'等待就诊'}`)
          .then(
            response => {
              this.registerlist = response.data.registers;
              if (this.registerlist.length > 0) {
                this.isEmpty = false;
                this.registerlist.forEach(item => {
                  item.r_datetime = this.$util.dateFormat(
                    item.r_datetime,
                    false
                  );
                });
              }
            },
            response => {
              console.log(response);
              // error callback
            }
          );
      }
    },
    cancel(r_id, index) {
      axios.get(this.$api.cancelregister + `/${r_id}`).then(
        response => {
          this.$router.go(0);
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

<style lang="stylus" rel="stylesheet/stylus">
.registationlist
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    border-radius: 5px
    padding: 10px 20px 20px 20px
    margin: 10px
    .seal
        position: absolute
        right: 80px
        top: 40px
        width: 160px
        height: 160px
        border-radius: 50%
        border: 6px double #E6A23C
        color: #E6A23C
        transform: rotate(20deg)
        -o-transform: rotate(20deg)
        -webkit-transform: rotate(20deg)
        -moz-transform: rotate(20deg)
        .sealtext
            position: relative
            top: 40px
            left: 18px
            font-size: 60px
</style>
