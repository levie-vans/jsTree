/**
 * 扩展Date的Format函数
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {[type]} fmt [description]
 */
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function getTime() {
  return ((new Date()).Format("yyyy-MM-dd hh:mm:ss"));
  // 2018-08-02 21:22:07
}


// 1 引入模块
const net = require('net');
// 2 创建服务器
let clientArr = [];
const server = net.createServer();
// 3 绑定链接事件
server.on('connection', (person) => {
  console.log(clientArr.length);
  // 记录链接的进程
  person.id = clientArr.length;
  clientArr.push(person);
  person.setEncoding('utf8');
  // 客户socket进程绑定事件
  person.on('data', (chunk) => {
    var msg=getTime() + "从客户端接收到消息->" + chunk +"\r\n"
    person.write(msg);

    console.log(msg);
    clientArr.forEach((val) => {
      // 数据写入全部客户进程中
      val.write(msg);
    })
  })
  person.on('close', (p1) => {
    clientArr[p1.id] = null;
  })
  person.on('error', (p1) => {
    clientArr[p1.id] = null;
  })
})
server.listen(8811);
