'use strict';

module.exports = function(app) {
  app.beforeStart(function* () {
    const mysqlConfig = yield app.configCenter.fetch('mysql');
    app.database = app.mysql.createInstance(mysqlConfig);
  });
};
