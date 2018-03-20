<template>
  <div class="u-illnessregistration">
    <el-row>
      <el-col :span="7">
        <div class="people">
          <div class="people_top">
            <el-switch @change="sexAndIsFrontChange()" v-show="people_top" v-model="sex" inactive-color="#E6A23C" active-text="女" inactive-text="男">
            </el-switch>
            <el-switch @change="sexAndIsFrontChange()" v-show="people_top" v-model="isFront" inactive-color="#E6A23C" active-text="背" inactive-text="正">
            </el-switch>
          </div>
          <div class="people_content">
            <div class="manfront" v-show="onshow.manfront">
              <img src="../../../assets/images/manfront.jpg" usemap="#map_manfront" />
              <map name="map_manfront" id="map_manfront">
                <area shape="rect" coords="62,64,108,84" @click="choosePart('头部')" />
                <area shape="rect" coords="31,110,77,130" @click="choosePart('皮肤、全身')" />
                <area shape="rect" coords="31,262,77,282" @click="choosePart('四肢')" />
                <area shape="rect" coords="192,137,238,157" @click="choosePart('胸部')" />
                <area shape="rect" coords="203,184,249,204" @click="choosePart('腹部')" />
                <area shape="rect" coords="194,220,240,240" @click="choosePart('男下身')" />
              </map>
            </div>
            <div class="man" v-show="onshow.man">
              <img src="../../../assets/images/man.jpg" usemap="#map_man" />
              <map name="map_man" id="map_man">
                <area shape="rect" coords="33,109,79,129" @click="choosePart('皮肤、全身')" />
                <area shape="rect" coords="193,137,239,157" @click="choosePart('骨')" />
                <area shape="rect" coords="196,201,242,221" @click="choosePart('腰、臀部')" />
              </map>
            </div>
            <div class="womanfront" v-show="onshow.womanfront">
              <img src="../../../assets/images/womanfront.jpg" usemap="#map_womanfront" />
              <map name="map_womanfront" id="map_womanfront">
                <area shape="rect" coords="62,64,108,84" @click="choosePart('头部')" />
                <area shape="rect" coords="37,112,83,132" @click="choosePart('皮肤、全身')" />
                <area shape="rect" coords="31,262,77,282" @click="choosePart('四肢')" />
                <area shape="rect" coords="193,137,239,157" @click="choosePart('胸部')" />
                <area shape="rect" coords="203,184,249,204" @click="choosePart('腹部')" />
                <area shape="rect" coords="194,220,240,240" @click="choosePart('女下身')" />
              </map>
            </div>
            <div class="woman" v-show="onshow.woman">
              <img src="../../../assets/images/woman.jpg" usemap="#map_woman" />
              <map name="map_woman" id="map_woman">
                <area shape="rect" coords="42,115,86,135" @click="choosePart('皮肤、全身')" />
                <area shape="rect" coords="196,141,242,161" @click="choosePart('骨')" />
                <area shape="rect" coords="200,205,246,225" @click="choosePart('腰、臀部')" />
              </map>
            </div>
            <div class="children" v-show="onshow.children">
              <img src="../../../assets/images/children.jpg" />
            </div>
            <div class="old" v-show="onshow.old">
              <img src="../../../assets/images/old.jpg" />
            </div>
          </div>
          <div class="people_bottom">
            <el-button-group>
              <el-button type="warning" size="small" @click="chooseAdult()">成人</el-button>
              <el-button type="warning" size="small" @click="chooseOld()">老人</el-button>
              <el-button type="warning" size="small" @click="chooseTeen()">儿童</el-button>
            </el-button-group>
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="illnesslist">
          <h1>{{illness[0].data[0].i_bigcategary}}</h1>
          <div v-for="item in illness" :key="item.i_categary" class="illness">
            <h2>{{item.i_categary}}</h2>
            <a @click="getillness(illness)" v-for="illness in item.data" :key="illness.i_id">{{illness.i_name}}</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      sex: false,
      isFront: false,
      people_top: true,
      illness: [],
      onshow: {
        man: false,
        manfront: true,
        woman: false,
        womanfront: false,
        children: false,
        old: false,
      },
    };
  },
  methods: {
    getillness(val) {
      this.setIllness(val);
      this.$router.push({ path: '/user/illnessregistrationlist' });
    },
    choosePart(part) {
      axios.get(this.$api.illnesslist + `/${part}`).then(
        response => {
          // success callback
          var result = response.data;
          this.illness = this.$util.delaminateByCategary(result);
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    sexAndIsFrontChange() {
      if (this.sex) {
        if (this.isFront) {
          this.onshow.man = false;
          this.onshow.manfront = false;
          this.onshow.woman = true;
          this.onshow.womanfront = false;
        } else {
          this.onshow.man = false;
          this.onshow.manfront = false;
          this.onshow.woman = false;
          this.onshow.womanfront = true;
        }
      } else {
        if (this.isFront) {
          this.onshow.man = true;
          this.onshow.manfront = false;
          this.onshow.woman = false;
          this.onshow.womanfront = false;
        } else {
          this.onshow.man = false;
          this.onshow.manfront = true;
          this.onshow.woman = false;
          this.onshow.womanfront = false;
        }
      }
    },
    chooseAdult() {
      this.people_top = true;
      this.onshow.manfront = true;
      this.sex = false;
      this.isFront = false;
      this.onshow.old = false;
      this.onshow.man = false;
      this.onshow.woman = false;
      this.onshow.womanfront = false;
      this.onshow.children = false;
      axios.get(this.$api.illnesslist + `/${'皮肤、全身'}`).then(
        response => {
          // success callback
          var result = response.data;
          this.illness = this.$util.delaminateByCategary(result);
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    chooseOld() {
      this.people_top = false;
      this.onshow.old = true;

      this.onshow.man = false;
      this.onshow.manfront = false;
      this.onshow.woman = false;
      this.onshow.womanfront = false;
      this.onshow.children = false;
      axios.get(this.$api.illnesslist + `/${'老人'}`).then(
        response => {
          // success callback
          var result = response.data;
          this.illness = this.$util.delaminateByCategary(result);
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    chooseTeen() {
      this.people_top = false;
      this.onshow.children = true;
      this.onshow.old = false;
      this.onshow.man = false;
      this.onshow.manfront = false;
      this.onshow.woman = false;
      this.onshow.womanfront = false;
      axios.get(this.$api.illnesslist + `/${'小儿'}`).then(
        response => {
          // success callback
          var result = response.data;
          this.illness = this.$util.delaminateByCategary(result);
        },
        response => {
          console.log(response);
          // error callback
        }
      );
    },
    ...mapMutations({
      setIllness: 'SET_ILLNESS',
    }),
  },
  created() {
    axios.get(this.$api.illnesslist + `/${'皮肤、全身'}`).then(
      response => {
        // success callback
        var result = response.data;
        this.illness = this.$util.delaminateByCategary(result);
      },
      response => {
        console.log(response);
        // error callback
      }
    );
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.u-illnessregistration
  margin-top: 55px
  .people
    width: 284px
    height: 540px
    overflow: hidden
    background: #f7f7f7
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    .people_top
      text-align: center
      padding-top: 10px
      height: 20px
      .el-switch
        margin: 0 10px
    .people_bottom
      text-align: center
      padding-bottom: 10px
    .people_content
      width: 284px
      height: 467px
  .illnesslist
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    padding: 20px
    h1
      color: #006db3
      border-bottom: 1px solid
      margin: 0px
      padding-bottom: 10px
    .illness
      border-bottom: 1px dashed #d4d4d4
      &:last-child
        border: 0
      h2
        color: #409EFF
      a
        display: inline-block
        width: 33%
        height: 30px
      a:hover
        display: inline-block
        color: #409EFF
        width: 33%
        font-weight: bolder
</style>
