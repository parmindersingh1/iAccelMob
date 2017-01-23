
(function (window) {
  window.__env = window.__env || {};

  var environment = "qa"; //can be dev, test or prod.

  //environment specific constants
  if(environment === "prod") {
    window.__env.uiServerUrl = 'http://ec2-54-85-125-209.compute-1.amazonaws.com:8086/ui';
    window.__env.userServerUrl = 'http://ec2-54-85-125-209.compute-1.amazonaws.com:8086/auth';
    window.__env.refDataUrl = 'http://ec2-54-85-125-209.compute-1.amazonaws.com:8086/core';
    window.__env.nodeJsUrl = 'http://ec2-52-90-74-144.compute-1.amazonaws.com:8001/api';
    window.__env.notificationServerUrl = 'http://ec2-54-85-125-209.compute-1.amazonaws.com:8086/notification';
    window.__env.dataServerUrl = 'http://ec2-54-85-125-209.compute-1.amazonaws.com:8086/dataProcessor';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "user0@datiot.com";
    window.__env.password = "";
  }
  else if(environment === "qa") {
    window.__env.uiServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8086/ui';
    window.__env.userServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8086/auth';
    window.__env.refDataUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8086/core';
    window.__env.nodeJsUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8001/api';
    window.__env.notificationServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8086/notification';
    window.__env.dataServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8086/dataProcessor';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "user0@datiot.com";
    window.__env.password = "";
  }
  else {//DEFAULT - assume dev
    window.__env.dataServerUrl = 'http://192.168.1.110:8084';
    window.__env.uiServerUrl = 'http://192.168.1.110:8083';
    window.__env.userServerUrl = 'http://192.168.1.110:8080';
    window.__env.refDataUrl = 'http://192.168.1.110:8081/core';
    window.__env.nodeJsUrl = 'http://192.168.1.110:3000/api';
    window.__env.notificationServerUrl = 'http://192.168.1.110:8082/notification';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "user0@datiot.com";
    window.__env.password = "secret";
  }


}(this));