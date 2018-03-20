'use strict';
module.exports = appInfo => {
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511511345886_3050';
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
      headerName: 'x-csrf-token',
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };
  return config;
};
