<template>
    <div class="uhome">
        <u-department-nav></u-department-nav>
        <el-row class="first-el-row">
            <el-col :span="5">
               hhhh 
            </el-col>
            <el-col :span="14">
                <el-carousel>
                    <el-carousel-item v-for="item in 5" :key="item">
                        <img :src="articleimages" class="articleimages" />
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="5">
                <u-quickreservation></u-quickreservation>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="19" class="u-home-main">
                <u-home-main></u-home-main>
            </el-col>
            <el-col :span="5">
                <u-quick-new-article></u-quick-new-article>
                <u-quick-new-notice></u-quick-new-notice>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import UDepartmentNav from 'components/user/u-department/u-departmentnav';
import UQuickreservation from 'components/user/u-quickreservation/u-quickreservation';
import UHomeMain from 'components/user/u-home/u-homemain';
import UQuickNewNotice from 'components/user/u-article/u-quick-newnotice';
import UQuickNewArticle from 'components/user/u-article/u-quick-newarticle';

export default {
  data() {
    return {
      itemHoverIndex: null,
      departments: [],
      department: null,
      articleimages: '',
    };
  },
  created() {
    this.articleimages = this.$api.articleimg + 'article01.jpg';
  },
  components: {
    UDepartmentNav,
    UQuickreservation,
    UHomeMain,
    UQuickNewNotice,
    UQuickNewArticle,
  },
};
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.uhome
    margin-top: 45px
    min-width: 1000px
    .el-row
        margin: 0px
        padding: 0px
        .u-home-main
            padding: 3px 3px 3px 0 !important
        .el-col
            padding: 3px 
            .el-carousel
                height: 445px
                width: 100%
                display: inline-block
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
                .el-carousel__container
                    height: 445px
                    width: 100%
                    .articleimages
                        height: 445px
                        width: 100%
</style>
