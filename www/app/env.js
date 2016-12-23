//define constants
//see /src/client/app/core/constant.js

(function (window) {
  window.__env = window.__env || {};

  var environment = "dev"; //can be dev, test or prod.

  //environment specific constants
  if(environment === "prod") {
    window.__env.uiServerUrl = 'http://localhost:8081/core/';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "";
    window.__env.password = "";
  }
  else if(environment === "qa") {
    window.__env.dataServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8084';
    window.__env.uiServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8083';
    window.__env.userServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8080';
    window.__env.refDataUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8081/core';
    window.__env.nodeJsUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8001/api';
    window.__env.notificationServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8082/notification';
    window.__env.dataServerUrl = 'http://ec2-54-251-154-20.ap-southeast-1.compute.amazonaws.com:8084';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "user0@datiot.com";
    window.__env.password = "secret";
  }
  else {//DEFAULT - assume dev
    window.__env.dataServerUrl = 'http://192.168.56.1:8084';
    window.__env.uiServerUrl = 'http://192.168.56.1:8083';
    window.__env.userServerUrl = 'http://192.168.56.1:8080';
    window.__env.refDataUrl = 'http://192.168.56.1:8081/core';
    window.__env.nodeJsUrl = 'http://192.168.56.1:3000/api';
    window.__env.notificationServerUrl = 'http://192.168.56.1:8082/notification';
    window.__env.baseUrl = '/';
    window.__env.enableDebug = true;
    window.__env.user = "user0@datiot.com";
    window.__env.password = "secret";
  }


}(this));
