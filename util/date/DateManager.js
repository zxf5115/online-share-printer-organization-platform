/** 
 * 时间管理类 
 * 
 * */
function DateManager () 
{
  this.date = new Date();
  /**
   * 获取某时间段内的时间数组
   * @param {
   *          数据为对象数据，结构如下
   *          {
   *            starDate  : '2020-04-02', // 开始时间 注意时间不要传入不可读取的时间，否则会出现无限循环 必填, 默认从当前日期向后一年
   *            endDate   : '2030-04-02', // 结束时间 同上
   *            format    : '数据格式，类型与Date一致 w(星期为数字1) W(星期为数字一)', // 默认为2020-04-02
   *            stepType  : 'y' // 阶梯长度 y M d h m s w(星期为数字1, 这里仅支持w, format支持大小写)代表年月日分秒单位 默认一天阶梯
   *            step      : 1 // 数值代表单位长度
   *            type      : 返回数组的类型，默认为正常返回，2 为单独拆分为序列化的数组，供picker使用 参数为2时需要填写splitKey为拆分key
   *            splitKey  : '-' 序列化拆分标志 默认为'-',
   *            callBack  : 传入callBack为异步 TODO: 未实现
   *          }
   *        }
   */
  this.getDateArray = (param = {}) => {
    let starDate  = param['starDate'] ? (new Date(param['starDate'])) : this.getCurrentDate();
    let endDate   = param['endDate']  ? (new Date(param['endDate']))  : this.getCurrentDate({y:1});
    let format    = param['format']   || "yyyy-MM-dd";   
    let splitKey  = param['splitKey'] || '-';
    let stepType  = param['stepType'] || 'd'; 
    let step      = param['step']     || 1; 
    let type      = param['type']     || 1;
    let obj       = {};
    let result;
    if ([1].indexOf(type) >= 0) 
      result = [];
    else 
      result = {};
    obj[stepType] = step
    while (1) {
      this.serializationDateArray(starDate, format, result, type, splitKey);
      obj['date'] = starDate;
      starDate = this.getCurrentDate(obj);
      if (starDate.getTime() > endDate.getTime()){
        break;
      } 
    }
    return result;
  }
  this.serializationDateArray = (date, format, array, type = 1, splitKey = '-') => {
    switch (type) {
      case 1:
        array.push(this.format(date, format));
        return array;
      case 2:
        let dateA = this.format(date, format).split(splitKey);
        return this.serializationDateArrayChild(dateA , array);
      default:
        return array;
    }
  }
  this.serializationDateArrayChild = (dateA, array) => {
    const element = dateA[0];
    if (!array['array']) array['array'] = [];
    if (!(array['array'].indexOf(element) >= 0)) array['array'].push(element);
    dateA.splice(0, 1);
    if (dateA.length <= 0) {
      return array;
    } else {
      if (!array['child']) array['child'] = {};
      if (!array['child'][element]) array['child'][element] = {};
      array['child'][element] = this.serializationDateArrayChild(dateA, array['child'][element]);
      return array;
    }
  }
  this.format = (date, fmt) => {
    if (typeof date == 'string') {
      date = new Date(date);
    }
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "w+": date.getDay(), // 1(星期)
        "W+": this.getWeek(date, true), // 一(星期)
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S" : date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  this.getWeek = (date, isUp = false) => {
    // 获取星期，大小写数字。
    let week = date.getDay();
    if (!isUp) return week;
    switch (week) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 7:
      case 0:
        return '日';
      default:
        return '';
    }
  }
  this.getYearTimestamp = (date) => {
    return new Date(`${this.format(date, 'yyyy')}-01-01`).getTime();
  }
  // 参数为偏移时间 date, s = 0, m = 0, d = 0, h = 0, M = 0, y = 0 都是小写 只有月份的M是大写 返回值是date
  // round : {y//取整的单位: 5//取整的数字} 不支持星期
  this.getCurrentDate = (param = {}) => {
    let date = (param.date || new Date());
    if (param.s) 
      date.setSeconds (date.getSeconds()  + param.s);
    if (param.m)
      date.setMinutes (date.getMinutes()  + param.m);
    if (param.d)
      date.setDate    (date.getDate()     + param.d);
    if (param.h)
      date.setHours   (date.getHours()    + param.h);
    if (param.M)
      date.setMonth   (date.getMonth()    + param.M);
    if (param.y)
      date.setFullYear(date.getFullYear() + param.y);
    if (param.w || param.W)
      date.setDay(date.getDay() + (param.w || param.W) * 7);
    if (param.round)
      return this.getRoundNumber(date, param.round);
    return date;
  }
  this.getRoundNumber = (date, param) => {
    if (param.s) {
      let number = param.s;
      let n = date.getSeconds();
      date.setSeconds (date.getSeconds()  + number - (n % number));
    }
    if (param.m) {
      let number = param.m;
      let n = date.getMinutes();
      date.setMinutes (date.getMinutes()  + number - (n % number));
    }
    if (param.d) {
      let number = param.d;
      let n = date.getDate();
      date.setDate    (date.getDate()     + number - (n % number));
    }
    if (param.h) {
      let number = param.h;
      let n = date.getHours();
      date.setHours   (date.getHours()    + number - (n % number));
    }
    if (param.M) {
      let number = param.M;
      let n = date.getMonth();
      date.setMonth   (date.getMonth()    + number - (n % number));
    }
    if (param.y) {
      let number = param.y;
      let n = date.getFullYear();
      date.setFullYear(date.getFullYear() + number - (n % number));
    }
    return date;
  }
  /**
   * 根据format格式反序列化时间 返回Date对象 仅支持解析年、月、日 年月日顺序不可变 支持的字符 yyyy MM M dd
   * 例: getDateWidthFormat('现在时间为: 2020年1月1日', '现在时间为: yyyy年M月d日')
   */
  this.getDateWidthFormat = (value, format) => {
    let rule = format;
    rule = rule.replace('yyyy', '(\\S*)')
    rule = rule.replace('MM', '(\\S*)')
    rule = rule.replace('M', '(\\S*)')
    rule = rule.replace('dd', '(\\S*)')
    rule = rule.replace('d', '(\\S*)')
    let reg = new RegExp(rule, 'g');
    let formatDate = [];
    let res = reg.exec(value);
    res.forEach((e, i) => {
      if (!i) return;
      // 月份的时候需要减1
      formatDate.push(i == 2 ? parseInt(e) - 1 : parseInt(e));
    })
    if (formatDate.length < 3) { // 加个补充不然年会有问题
      for (let i = formatDate.length; i <= 3; i++) {
        formatDate.push(1);
      }
    }
    return new Date(...formatDate)
  }
  this.month = (date) => {
    return this.format(date, 'MM');
  }
  this.year = (date) => {
    return this.format(date, 'yyyy');
  }

}
const dateManager = new DateManager();
export {DateManager, dateManager};