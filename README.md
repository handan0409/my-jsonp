#### 一个jsonp的简易封装
***
###### 下载
npm install my-jsonp --save-dev
或
yarn add my-jsonp
###### 使用方法示例
***
```
    jsonp("//localhost:8000/api/getlist", {
      data: { qwe: 123, asd: 456 },
      jsonp: "callback123",
      jsonpCallBack: "zhangsan",
      // timeout: 2000,
      beforeSend: function () {
        console.log("beforsend");
      },
      success: function (res) {
        console.log(res);
        document.querySelector("p").innerHTML = JSON.stringify(res) ;
      },
      complete: function () {
        console.log("complete");
      },
      error: function (error) {
        // console.log(error);
      }
    })
```
参数说明
***
 * @param {String|Object} params    url或者一个参数对象
 * @param {String} url    jsonp请求的地址
 * @param {String} jsonp    jsonp请求，指定的参数的名称
 * @param {String} jsonpCallBack    jsonp请求的回调函数的名称
 * @param {String|Number} timeout     jsonp请求的过期时间
 * @param {Object} data     jsonp请求参数
 * @param {Function} beforeSend     jsonp请求之前的回调函数
 * @param {Function} success    jsonp请求成功的响应函数
 * @param {Function} complete     jsonp请求结束后的回调函数
 * @param {Function} error    jsonp请求失败的回调函数
