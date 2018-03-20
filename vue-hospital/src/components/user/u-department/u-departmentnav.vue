<template>
    <div class="nav">
        <div @mouseleave="mouseLeave()" style="display: inline-block">
            <div class="u-nav">
                <div class="menu-item" :class="{isActive:itemHoverIndex==index }" @mouseenter="mouseEnter(index)" v-for="(item,index) in departments" :key="item.id" v-if="item.id<=10">
                    <i :class="item.icon" class="dicon"></i>
                    <span> {{item.name}}</span>
                    <span class="child"> {{item.childdepartments[1].name}}科</span>
                    <span class="child"> {{item.childdepartments[0].name}}科</span>
                </div>
            </div>
            <el-card class="d-box-card" v-if="department">
                <h4>{{department.name}}</h4>
                <el-button type="primary" plain size="small" round v-for="(item,index) in department.childdepartments" :key="item.name" @click="getChildDepartmentList(item.name)">{{item.name}}科</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      itemHoverIndex: null,
      departments: [],
      department: null,
    };
  },
  created() {
    var data = require('../../../assets/data.json');
    this.departments = data.departments;
    console.log(this.departments);
  },
  methods: {
    mouseEnter(index) {
      this.itemHoverIndex = index;
      this.department = this.departments[index++];
      console.log(this.department);
    },
    mouseLeave() {
      this.itemHoverIndex = null;
      this.department = null;
      console.log('as');
    },
    getChildDepartmentList(val) {
      this.setChildDepartment(val);
      this.setMenu('3');
      this.$router.push({ path: '/user/childdepartmentregistration' });
    },
    ...mapMutations({
      setMenu: 'SET_MENU',
      setChildDepartment: 'SET_CHILDDEPARTMENT',
    }),
  },
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.nav
    z-index: 100
    position: absolute
    .u-nav
        width: 220px
        background-color: #1fa4f0
        display: inline-block
        vertical-align: top
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
        .menu-item
            height: 45px
            line-height: 45px
            list-style: none
            color: #fff
            .dicon
                margin-left: 10px
                color: #fff
                margin-right: 5px
            .child
                float: right
                margin-right: 5px
                font-size: small
                color: #d7f3ff
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
        .menu-item.isActive
            height: 45px
            line-height: 45px
            list-style: none
            color: #1fa4f0
            background-color: #fff !important
            .dicon
                margin-left: 10px
                color: #1fa4f0
                margin-right: 5px
            .child
                float: right
                margin-right: 5px
                font-size: small
                color: #1fa4f0
                overflow: hidden
    .d-box-card
        display: inline-block
        width: 600px
        height: 448px
        position: relative
        left: -4px
        background-image: url('../../../assets/images/department.jpg')
        .el-button
            margin: 5px
</style>
