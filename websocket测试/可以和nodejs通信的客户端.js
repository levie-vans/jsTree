importClass("java.io.DataInputStream");
importClass("java.io.DataOutputStream");
importClass("java.io.OutputStreamWriter");
importClass("java.io.BufferedWriter");
importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.UnknownHostException');
console.show();
var ip = "192.168.12.104";
var socket = new Socket(ip, 8811);
var out = socket.getOutputStream();
var dataOS = new DataOutputStream(out);
var outSW = new OutputStreamWriter(dataOS, "UTF-8");
var bw = new BufferedWriter(outSW);
var str = '搜狗abc123'
//发送数据
bw.write(str + "\r\n"); //加上分行符，以便服务器按行读取
bw.flush()
var str = '搜狗abc123'
//发送数据
bw.write(str + "\r\n"); //加上分行符，以便服务器按行读取
bw.flush()
var str = '搜狗abc123'
//发送数据
bw.write(str + "\r\n"); //加上分行符，以便服务器按行读取
bw.flush()

function heartBeat() {
  var HeartBeatContent = "这是手机心跳包传过来的数据HeartBeat"
  bw.write(HeartBeatContent);
  bw.flush();
}
threads.start(function () { 
  while (1) {
    sleep(3300);
    heartBeat();
  }
});
var inputStream = socket.getInputStream(); //获取一个输入流，接收服务端的信息
var inputStreamReader = new InputStreamReader(inputStream); //包装成字符流，提高效率
var bufferedReader = new BufferedReader(inputStreamReader); //缓冲区
while (1) {
  var a = bufferedReader.readLine();
  // log(a);
  try {
    log('从服务器获取的数据->' + a)
  } catch (err) {
    console.log(err)
  }
  sleep(1000)
};
