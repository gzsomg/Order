let base = 'http://127.0.0.1:7001/';
export default {
  avatar: `${base}public/images/avatar/`,
  hospitalimg: `${base}public/images/hospital/`,
  articleimg: `${base}public/images/article/`,
  //userApi
  login: `${base}user/login`,
  gethospital: `${base}gethospital`,
  getallhospitalnoticelist: `${base}getallhospitalnoticelist`,
  // 医院查询
  gethospitallistbydistrict: `${base}gethospitallistbydistrict`,
  getchilddepartmentlistbydepartmentlist: `${base}getchilddepartmentlistbydepartmentlist`,
  // 通过医院id查询科室及至子科室
  getdepaandchildbyhospital: `${base}getdepaandchildbyhospital`,
  // 医院留言
  getcommentlist: `${base}getcommentlist`,
  publishcomment: `${base}user/publishcomment`,
  //通过子科室id获得子科室科室医院信息
  gethospanddepabychild: `${base}gethospanddepabychild`,
  //通过子科室id医生信息
  getexpertbychild: `${base}getexpertbychild`,
  //通过地区和等级选择医院
  gethospitalbydistrictandrank: `${base}gethospitalbydistrictandrank`,
  // 医院 分页 按等级 地区 类型
  gethospitallistbychoose: `${base}gethospitallistbychoose`,
  // 子科室 分页 名字
  getchilddepartmentlistbyname: `${base}getchilddepartmentlistbyname`,
  getchilddepartmentlistbyillness: `${base}getchilddepartmentlistbyillness`,
  //上传头像
  userUploadavatar: `${base}user/useruploadavatar`,
  //用户信息修改
  userMessageupdate: `${base}user/usermessageupdate`,
  //患者信息表
  getpatientsbyuser: `${base}user/getpatientsbyuser`,
  patientupdate: `${base}user/patientupdate`,
  patientnew: `${base}user/patientnew`,
  patientdelete: `${base}user/patientdelete`,
  //7天预约信息
  getregisterbyexpert: `${base}user/getregisterbyexpert`,
  //预约
  registernew: `${base}user/registernew`,
  //预约列表
  registerlist: `${base}user/registerlist`,
  //取消预约
  cancelregister: `${base}user/cancelregister`,
  // 删除预约
  deleteregister: `${base}user/deleteregister`,
  // 疾病列表
  illnesslist: `${base}user/illnesslist`,
  //--------------------------------------------------------------------------------------------------
  // adminApi
  childdepartmentlist: `${base}childdepartmentlist`,
  hospitallist: `${base}hospitallist`,
  hospitalupdate: `${base}admin/hospitalupdate`,
  hospitalnew: `${base}admin/hospitalnew`,
  hospitaldelete: `${base}admin/hospitaldelete`,

  departmentupdate: `${base}admin/departmentupdate`,
  departmentnew: `${base}admin/departmentnew`,
  departmentdelete: `${base}admin/departmentdelete`,

  childdepartmentupdate: `${base}admin/childdepartmentupdate`,
  childdepartmentnew: `${base}admin/childdepartmentnew`,
  childdepartmentdelete: `${base}admin/childdepartmentdelete`,

  expertupdate: `${base}expert/expertupdate`,
  expertnew: `${base}expert/expertnew`,
  expertdelete: `${base}expert/expertdelete`,

  noticenew: `${base}admin/noticenew`,
  noticedelete: `${base}admin/noticedelete`,
  // systemadminApi
  getadminlist: `${base}getadminlist`,
  getuserlist: `${base}getuserlist`,
  getpatientlist: `${base}getpatientlist`,
  adminupdate: `${base}systemadmin/adminupdate`,
  adminnew: `${base}systemadmin/adminnew`,
  admindelete: `${base}systemadmin/admindelete`,
  userdelete: `${base}systemadmin/userdelete`,
  articlenew: `${base}systemadmin/articlenew`,
  articledelete: `${base}systemadmin/articledelete`,
  //文章列表 分页
  getArticlelist: `${base}getarticlelist`,
  getnoticelist: `${base}getnoticelist`,
  //科室列表 分页 搜索
  getalldepartmentList: `${base}getalldepartmentList`,
  getdepartmentlist: `${base}getdepartmentlist`,
  getChildDepartmentList: `${base}getchilddepartmentlist`,
  //医院列表 分页 搜索
  gethospitallist: `${base}gethospitallist`,
  //医生列表 分页 搜索
  getexpertList: `${base}getexpertlist`,
  getchilddepartmentbyexpert: `${base}getchilddepartmentbyexpert`,
  //上传头像
  uploadavatar: `${base}admin/uploadavatar`,
  uploadhospital: `${base}systemadmin/uploadhospital`,
  //修改名称
  adminNameupdate: `${base}admin/adminNameupdate`,
  //修改密码
  adminPasswordupdate: `${base}admin/adminPasswordupdate`,
};
