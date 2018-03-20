<template>
    <div class="userCenter">
        <el-tabs tab-position="left">
            <el-tab-pane label="用户中心">
                <u-user-message></u-user-message>
            </el-tab-pane>
            <el-tab-pane label="患者管理">
                <u-patient></u-patient>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import UUserMessage from 'components/user/u-usercenter/u-usermessage';
import UPatient from 'components/user/u-usercenter/u-patient';
export default {
  components: {
    UUserMessage,
    UPatient,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.userCenter
    margin-top: 55px
    padding: 13px
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
    min-height: 450px
</style>
