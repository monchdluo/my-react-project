// 封装axios的模块
import axios from "axios";
import errCode from "../config/error-code";

const axiosInstance = axios.create({
  baseURL: "/api", // 这是公共请求的路径前缀
  timeout: 19000, // this is请求超时时间
  headers: {
    // 这里放死的公共请求头参数
  }
});

// 设置请求拦截器函数丶

// 请求拦截器
axiosInstance.interceptors.request.use(config => {
  // 设置公用参数

  // 待处理token
  let token = "";
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  // 如果是POST请求，请求头只有aoolication/x-www-form-urlencoded要转换

  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((p, c) => {
        p += `&${c}=${config.data[c]}`;
        return p;
      }, "")
      .slice(1);
    config.headers["content-type"] = "applicaion/x-www-form-urlencoded";
  }
  return config;
});
// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    //成功返回成的promise，失败返回失败的promise
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  err => {
    // 不同错误，分别提示

    let errMsg = "";
    if (err.response) {
      // 接收响应，但是是失败的
      errMsg = errCode[err.response.status];
    } else {
      // 没接收到，响应失败
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络连接失败，请联网试试";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMsg = "网络超时，请检查您的网络";
      }
    }
    return Promise.reject(errMsg || "服务器未知错误，请联系管理员");
  }
);

export default axiosInstance;
