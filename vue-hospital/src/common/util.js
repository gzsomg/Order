import axios from 'axios';
var utils = {
  dateFormat: function(date, flag) {
    var array = date.split('T');
    var _day = array[0].split('-');
    var _time = array[1].split('.');

    var year = parseInt(_day[0]);
    var month = parseInt(_day[1]);
    var day = parseInt(_day[2]);

    var time = _time[0].split(':');
    time[0] = parseInt(time[0]) + 8;
    time[0] = time[0].toString();
    if (time[0].length == 1) {
      time[0] = '0' + time[0];
    }
    var resulttime = time.join(':');
    var msg = '';
    if (flag === true) {
      msg = year + '年' + month + '月' + day + '日';
    } else {
      msg = year + '/' + month + '/' + day + ' ' + resulttime;
    }
    return msg;
  },
  getDay: function(day) {
    var today = new Date();

    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var weekday = '星期' + '日一二三四五六'.charAt(today.getDay());
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    var date = tYear + '-' + tMonth + '-' + tDate;
    var result = {
      weekday: weekday,
      date: date,
    };
    return result;
  },
  getDayTime: function(day, isMorning, order) {
    var today = new Date();

    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    var minute;
    var hour;
    if (isMorning) {
      hour = 9 + order / 2;
      minute = (order % 2) * 30;
    } else {
      if (order > 5) order = order - 5;
      else order = 0;
      hour = 14 + order / 2;
      minute = (order % 2) * 30;
    }
    var date = new Date(tYear, tMonth, tDate, hour, minute);
    return date;
  },
  doHandleMonth: function(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = '0' + month;
    }
    return m;
  },
  delaminateByCategary: function(result) {
    let map = {},
      dest = [];
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      if (!map[element.i_categary]) {
        dest.push({ i_categary: element.i_categary, data: [element] });
        map[element.i_categary] = element;
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j];
          if (dj.i_categary === element.i_categary) {
            dj.data.push(element);
            break;
          }
        }
      }
    }
    return dest;
  },
};
export default utils;
