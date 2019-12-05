/**
 * jsonp跨域请求封装
 */

/**
 * 一个空的函数
 */
function noop(){}


/**
 * 
 * @param {String|Object} params url或者一个参数对象
 * @param {String} url jsonp请求的地址
 * @param {String} jsonp jsonp请求，指定的参数的名称
 * @param {String} jsonpCallBack jsonp请求的回调函数的名称
 * @param {String|Number} timeout jsonp请求的过期时间
 * @param {Object} data jsonp请求参数
 * @param {Function} beforeSend jsonp请求之前的回调函数
 * @param {Function} success jsonp请求成功的响应函数
 * @param {Function} complete jsonp请求结束后的回调函数
 * @param {Function} error jsonp请求失败的回调函数
 */
function jsonp(params,options){
  if (!options) options = params;
  const { url=params, data, success, complete, error  } = options;
  if(url === "" || url === undefined) {
    console.error("jsonp请求的url不能为空");
    return ;
  }
  if(data && !Object.prototype.toString.call(data)  === "[object Object]" ) {
    console.error("jsonp请求参数格式错误，期待一个对象")
    return ;
  }
  var jsonp = options.jsonp || "callback"; // 默认传递的key值
  var jsonpCallBack = options.jsonpCallBack || "myJsonp" + new Date().getTime();  // 默认传递的value值
  var timeout = options.timeout || 30000;
  var enc = encodeURIComponent;  // 做一个url编码，防止出现乱码
  var bodyEl = window.document.body;
  var timer = null;
  var script = "";

  if(options.beforeSend) options.beforeSend();

  function cleanup(){
    if(complete) complete();
    if (script) bodyEl.removeChild(script);
    window[jsonpCallBack] = noop;
    // try {
    //   delete window[jsonpCallBack];
    // } catch (error) {}
    clearTimeout(timer);
  }

  // 成功
  window[jsonpCallBack] = function(res){
    if(success) success(res);
    cleanup();
  };

  // 超时
  if (timeout) {
    timer = setTimeout(function(){
      console.error("Timeout");
      if (options.error) options.error(new Error('Timeout'));
      cleanup();
    }, timeout);
  }

  var src = url + (~url.indexOf('?') ? "&" : "?" ) + jsonp + "=" + enc(jsonpCallBack);
  for (var key in data) {
		src += ( "&" + key + "=" + data[key] );
  }
  script = document.createElement("script");
  script.src = src;
  bodyEl.appendChild(script);
}

module.exports = jsonp;
// export default jsonp;