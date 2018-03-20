<template>
  <div class="user">
    <u-header></u-header>
    <router-view></router-view>
    <u-footer></u-footer>
  </div>
</template>

<script>
import UHeader from 'components/user/u-header/u-header';
import UFooter from 'components/user/u-footer/u-footer';
export default {
  components: {
    UHeader,
    UFooter
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import url('../../assets/iconfont/iconfont')

.user
  min-width: 1000px
  margin: 0 15%
</style>
