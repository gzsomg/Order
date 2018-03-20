'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/user/signup', app.controller.user.signUp);
  router.post('/user/login', app.controller.user.login);
  router.get('/user/userlist', app.controller.user.userlist);
  router.get('/user/:id', app.controller.user.info);
  router.get('/hospitallist', app.controller.department.hospitalList);
  router.get('/childdepartmentlist', app.controller.department.ChildDepartmentList);
  router.get('/gethospital/:id', app.controller.department.getHospital);
  router.get(
    '/getalldepartmentList/:id',
    app.controller.department.getALLDepartmentList
  );
  // 公告列表 分页
  router.get(
    '/getallhospitalnoticelist/:page',
    app.controller.article.getAllHospitalNoticelist
  );
  // 通过地区查医院
  router.get(
    '/gethospitallistbydistrict/:key',
    app.controller.search.getHospitalListByDistrict
  );
  router.get(
    '/getchilddepartmentlistbydepartmentlist/:key',
    app.controller.search.getChilddepartmentListByDepartmentlist
  );
  // 医院留言
  router.get(
    '/getcommentlist/:id/:page',
    app.controller.department.getCommentlist
  );
  // 通过医院id查询科室及至子科室
  router.get(
    '/getdepaandchildbyhospital/:id',
    app.controller.search.getDepaAndChildByHospital
  );
  // 留言
  router.post('/user/publishcomment', app.controller.user.publishComment);
  // 通过子科室id获得子科室科室医院信息
  router.get(
    '/gethospanddepabychild/:id',
    app.controller.search.getHospAndDepaByChild
  );
  // 通过子科室id获得医生列表
  router.get('/getexpertbychild/:id', app.controller.search.getExpertByChild);
  // 通过地区和等级选择医院
  router.get(
    '/gethospitalbydistrictandrank/:district/:rank',
    app.controller.search.getHospitalByDistrictAndRank
  );
  // 医院 分页 按等级 地区 类型
  router.get(
    '/gethospitallistbychoose/:page/:type/:district/:rank',
    app.controller.hospital.getHospitalListByChoose
  );
  // 子科室 分页 名字
  router.get(
    '/getchilddepartmentlistbyname/:page/:key',
    app.controller.hospital.getChildDepartmentListByName
  );
  router.get(
    '/getchilddepartmentlistbyillness/:page/:key',
    app.controller.illness.getChildDepartmentListByIllness
  );
  // 头像上传
  router.post('/user/useruploadavatar', app.controller.user.userUploadavatar);
  // 用户信息修改
  router.put('/user/usermessageupdate', app.controller.user.userMessageupdate);
  // 患者信息表
  router.get(
    '/user/getpatientsbyuser/:id',
    app.controller.user.getPatientsByUser
  );
  router.post('/user/patientnew', app.controller.user.patientNew);
  router.put('/user/patientupdate', app.controller.user.patientUpdate);
  router.delete('/user/patientdelete/:id', app.controller.user.patientDelete);
  // 七天预约信息
  router.get(
    '/user/getregisterbyexpert/:id',
    app.controller.register.getRegisterByExpert
  );
  // 预约
  router.post('/user/registernew', app.controller.register.registerNew);
  // 预约列表
  router.get(
    '/user/registerlist/:id/:key',
    app.controller.register.registerList
  );
  // 取消预约
  router.get(
    '/user/cancelregister/:id',
    app.controller.register.cancelRegister
  );
  // 删除预约
  router.delete(
    '/user/deleteregister/:id',
    app.controller.register.deleteRegister
  );
  // 疾病列表
  router.get(
    '/user/illnesslist/:key',
    app.controller.illness.illnessList
  );
  //------------------------------------------------------------------------------------------------------------
  // 科室列表 分页 搜索
  router.get(
    '/getdepartmentlist/:id/:page/:key',
    app.controller.department.getDepartmentList
  );
  router.get(
    '/getchilddepartmentlist/:id',
    app.controller.department.getChildDepartmentList
  );
  // 医院列表 分页 搜索
  router.get(
    '/gethospitallist/:page/:key',
    app.controller.department.getHospitalList
  );
  // 管理员列表 分页 搜索
  router.get(
    '/getadminlist/:page/:key',
    app.controller.systemadmin.getadminList
  );
  // 用户列表 分页 搜索
  router.get('/getuserlist/:page/:key', app.controller.systemadmin.getUserList);
  router.get('/getpatientlist/:id', app.controller.systemadmin.getPatientlist);
  // 文章列表 分页
  router.get('/getarticlelist/:page', app.controller.article.getArticlelist);
  // 公告列表 分页
  router.get('/getnoticelist/:id/:page', app.controller.article.getNoticelist);
  // 医生列表 分页 搜索
  router.get(
    '/getexpertlist/:id/:page/:key',
    app.controller.expert.getExpertList
  );
  // 通过医生查询子科室 科室
  router.get(
    '/getchilddepartmentbyexpert/:id',
    app.controller.expert.getchilddepartmentbyexpert
  );
  // 头像上传
  router.post('/admin/uploadavatar', app.controller.admin.uploadavatar);
  router.post(
    '/systemadmin/uploadhospital',
    app.controller.systemadmin.uploadhospital
  );
  // admin
  router.post('/admin/hospitalnew', app.controller.admin.hospitalNew);
  router.put('/admin/hospitalupdate', app.controller.admin.hospitalUpdate);
  router.delete(
    '/admin/hospitaldelete/:id',
    app.controller.admin.hospitalDelete
  );

  router.post('/admin/departmentnew', app.controller.admin.departmentNew);
  router.put('/admin/departmentupdate', app.controller.admin.departmentUpdate);
  router.delete(
    '/admin/departmentdelete/:id',
    app.controller.admin.departmentDelete
  );

  router.post(
    '/admin/childdepartmentnew',
    app.controller.admin.childDepartmentNew
  );
  router.put(
    '/admin/childdepartmentupdate',
    app.controller.admin.childDepartmentUpdate
  );
  router.delete(
    '/admin/childdepartmentdelete/:id',
    app.controller.admin.childDepartmentDelete
  );

  router.post('/expert/expertnew', app.controller.expert.expertNew);
  router.put('/expert/expertupdate', app.controller.expert.expertUpdate);
  router.delete('/expert/expertdelete/:id', app.controller.expert.expertDelete);
  // 公告
  router.post('/admin/noticenew', app.controller.article.noticeNew);
  router.delete('/admin/noticedelete/:id', app.controller.article.noticeDelete);
  // systemadmin
  router.post('/systemadmin/adminnew', app.controller.systemadmin.adminNew);
  router.put(
    '/systemadmin/adminupdate',
    app.controller.systemadmin.adminUpdate
  );
  router.delete(
    '/systemadmin/admindelete/:id',
    app.controller.systemadmin.adminDelete
  );
  router.delete(
    '/systemadmin/userdelete/:id',
    app.controller.systemadmin.userDelete
  );
  // 文章
  router.post('/systemadmin/articlenew', app.controller.article.articleNew);
  router.delete(
    '/systemadmin/articledelete/:id',
    app.controller.article.articleDelete
  );
  // 修改名称
  router.put('/admin/adminNameupdate', app.controller.admin.adminNameupdate);
  // 修改密码
  router.put(
    '/admin/adminPasswordupdate',
    app.controller.admin.adminPasswordupdate
  );
};
