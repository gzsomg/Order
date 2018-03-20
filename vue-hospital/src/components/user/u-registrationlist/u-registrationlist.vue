<template>
    <div class="registrationlist">
        <el-tabs tab-position="top">
            <el-tab-pane label="等待就诊">
                <u-wait-registation></u-wait-registation>
            </el-tab-pane>
            <el-tab-pane label="完成就诊">
                <u-finished-registation></u-finished-registation>
            </el-tab-pane>
            <el-tab-pane label="取消订单">
                <u-without-registation></u-without-registation>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UWaitRegistation from 'components/user/u-registrationlist/u-waitregistation';
import UFinishedRegistation from 'components/user/u-registrationlist/u-finishedregistration';
import UWithoutRegistation from 'components/user/u-registrationlist/u-withoutregistration';
export default {
  components: {
    UWaitRegistation,
    UFinishedRegistation,
    UWithoutRegistation,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.registrationlist
    margin-top: 55px
    padding: 13px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    min-height: 450px
</style>
