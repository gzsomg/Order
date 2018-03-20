import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Adminindex from '@/components/admin/adminindex';
import Userindex from '@/components/user/userindex';

// Admin
import AdminMessage from '@/components/admin/a-adminmessage/a-adminmessage';

import HospitalList from '@/components/admin/a-hospital/a-hospitallist';
import HospitalEdit from '@/components/admin/a-hospital/a-hospitaledit';
import HospitalNew from '@/components/admin/a-hospital/a-hospitalnew';

import DepartmentList from '@/components/admin/a-department/a-departmentlist';
import DepartmentEdit from '@/components/admin/a-department/a-departmentedit';
import DepartmentNew from '@/components/admin/a-department/a-departmentnew';

import AdminList from '@/components/admin/a-admin/a-adminlist';
import AdminEdit from '@/components/admin/a-admin/a-adminedit';
import AdminNew from '@/components/admin/a-admin/a-adminnew';

import UserList from '@/components/admin/a-user/a-userlist';
import UserDetail from '@/components/admin/a-user/a-userdetail';

import ChildDepartmentEdit from '@/components/admin/a-childdepartment/a-childdepartmentedit';
import ChildDepartmentNew from '@/components/admin/a-childdepartment/a-childdepartmentnew';

import ExpertList from '@/components/admin/a-expert/a-expertlist';
import ExpertEdit from '@/components/admin/a-expert/a-expertedit';
import ExpertNew from '@/components/admin/a-expert/a-expertnew';

import ArticleList from '@/components/admin/a-article/a-articlelist';
import ArticleNew from '@/components/admin/a-article/a-articlenew';
import ArticleDetail from '@/components/admin/a-article/a-articledetail';

import NoticeList from '@/components/admin/a-notice/a-noticelist';
import NoticeNew from '@/components/admin/a-notice/a-noticenew';
import NoticeDetail from '@/components/admin/a-notice/a-noticedetail';

//user
import UHome from '@/components/user/u-home/u-home';
import UArticle from '@/components/user/u-article/u-article';
import UNotice from '@/components/user/u-article/u-notice';
import UArticleDetail from '@/components/user/u-article/u-articledetail';
import UNoticeDetail from '@/components/user/u-article/u-noticedetail';

import UHospitalRegistration from '@/components/user/u-registration/u-hospitalregistration';
import UDepartmentRegistration from '@/components/user/u-registration/u-departmentregistration';
import UIllnessRegistration from '@/components/user/u-registration/u-illnessregistration';
import UIllnessRegistrationList from '@/components/user/u-registration/u-illnessregistrationlist';
import URegistration from '@/components/user/u-registration/u-registration';
import UChildDepartmentRegistration from '@/components/user/u-registration/u-childdepartmentregistration';
import UFinishRegistration from '@/components/user/u-registration/u-finishregistration';

import UHospital from '@/components/user/u-hospital/u-hospital';
import UPublishComment from '@/components/user/u-hospital/u-publishComment';
import URegistrationList from '@/components/user/u-registrationlist/u-registrationlist';
import UUserCenter from '@/components/user/u-usercenter/u-usercenter';
import UPatientEdit from '@/components/user/u-usercenter/u-patientedit';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/adminindex',
      name: 'Adminindex',
      component: Adminindex,
      redirect: '/admin/adminmessage',
      children: [
        {
          path: '/admin/adminmessage',
          component: AdminMessage,
        },
        {
          path: '/admin/adminlist',
          component: AdminList,
        },
        {
          path: '/admin/adminedit',
          component: AdminEdit,
        },
        {
          path: '/admin/adminnew',
          component: AdminNew,
        },
        {
          path: '/admin/userlist',
          component: UserList,
        },
        {
          path: '/admin/userdetail',
          component: UserDetail,
        },
        {
          path: '/admin/hospitallist',
          component: HospitalList,
        },
        {
          path: '/admin/hospitaledit',
          component: HospitalEdit,
        },
        {
          path: '/admin/hospitalnew',
          component: HospitalNew,
        },
        {
          path: '/admin/expertlist',
          component: ExpertList,
        },
        {
          path: '/admin/expertedit',
          component: ExpertEdit,
        },
        {
          path: '/admin/expertnew',
          component: ExpertNew,
        },
        {
          path: '/admin/departmentlist',
          component: DepartmentList,
        },
        {
          path: '/admin/departmentnew',
          component: DepartmentNew,
        },
        {
          path: '/admin/departmentedit',
          component: DepartmentEdit,
        },
        {
          path: '/admin/childdepartmentnew',
          component: ChildDepartmentNew,
        },
        {
          path: '/admin/childdepartmentedit',
          component: ChildDepartmentEdit,
        },
        {
          path: '/admin/articlelist',
          component: ArticleList,
        },
        {
          path: '/admin/articlenew',
          component: ArticleNew,
        },
        {
          path: '/admin/articledetail',
          component: ArticleDetail,
        },
        {
          path: '/admin/noticelist',
          component: NoticeList,
        },
        {
          path: '/admin/noticenew',
          component: NoticeNew,
        },
        {
          path: '/admin/noticedetail',
          component: NoticeDetail,
        },
      ],
    },
    {
      path: '/userindex',
      name: 'Userindex',
      component: Userindex,
      redirect: '/user/home',
      children: [
        {
          path: '/user/home',
          component: UHome,
        },
        {
          path: '/user/article',
          component: UArticle,
        },
        {
          path: '/user/notice',
          component: UNotice,
        },
        {
          path: '/user/articledetail',
          component: UArticleDetail,
        },
        {
          path: '/user/noticedetail',
          component: UNoticeDetail,
        },
        {
          path: '/user/illnessregistration',
          component: UIllnessRegistration,
        },
        {
          path: '/user/illnessregistrationlist',
          component: UIllnessRegistrationList,
        },
        {
          path: '/user/departmentregistration',
          component: UDepartmentRegistration,
        },
        {
          path: '/user/hospitalregistration',
          component: UHospitalRegistration,
        },
        {
          path: '/user/registration',
          component: URegistration,
        },
        {
          path: '/user/registrationlist',
          component: URegistrationList,
        },
        {
          path: '/user/hospital',
          component: UHospital,
        },
        {
          path: '/user/publishcomment',
          component: UPublishComment,
        },
        {
          path: '/user/childdepartmentregistration',
          component: UChildDepartmentRegistration,
        },
        {
          path: '/user/usercenter',
          component: UUserCenter,
        },
        {
          path: '/user/patientedit',
          component: UPatientEdit,
        },
        {
          path: '/user/finishregistration',
          component: UFinishRegistration,
        },
      ],
    },
  ],
});
