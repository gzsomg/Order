<template>
  <div class="admin">
      <a-header></a-header>
      <a-sidebar></a-sidebar>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">&nbsp</div></el-col>
        <el-col :span="20"><div class="grid-content bg-purple-light">
            <router-view></router-view></div></el-col>
      </el-row>
  </div>
</template>

<script>
import AHeader from 'components/admin/a-header/a-header';
import ASidebar from 'components/admin/a-sidebar/a-sidebar';
export default {
    components: {
        AHeader,
        ASidebar
    }
}
</script>

<style>
 html{
    height: 100%;
 }
 body{
    height: 100%; 
 }
 .admin{
     height: 100%;
 }
</style>
