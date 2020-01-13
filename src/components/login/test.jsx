import React from "react";
import axios from "axios";
import { message } from "antd";

export default function Test() {
  let token = "";
  let id = "";

  // 自己创建的axios实例，可以修改axios默认配置
  const axiosInstance = axios.create({
    baseURL: "/api", // 公共的路径，后面的都会加上这个
    timeout: 20000, //请求超时的时间
    headers: {
      // 公共的请求头，参数必须是静态的
    }
  });

  // 设置拦截器
  // 请求拦截器（发送请求之前调用）
  axiosInstance.interceptors.request.use(
    // 设置发送请求，代码成功（并没发送请求）
    config => {
      // config是一个对象，里面包含所有发送请求的配置
      // 修改config配置，添加动态headers参数
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      /*
        看接口是否是必须使用"application/x-www-form-urlencoded"发送请求  
      */
      if (config.method === "post") {
        // 修改请求参数
        const keys = Object.keys(config.data);
        const data = keys
          .reduce((prev, curr) => {
            prev += `&${curr}=${config.data[curr]}`;
            return prev;
          }, "")
          .slice(1);
        config.data = data;
        config.headers["content-type"] = "application/x-www-form-urlencoded";
      }
      return config;
    }
    /*   // 设置发送请求，代码失败，但这个函数基本上用不上
    (error) => {
      // 失败的原因，返回一个失败的promise对象
      return Promise.reject(err);
    } */
  );

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    // 请求/响应成功 2xx
    response => {
      if (response.data.status === 0) {
        return response.data.data;
      } else {
        // 功能失败
        return Promise.reject(response.data.msg);
      }
    },
    // 请求/响应失败 4xx 5xx 等等
    err => {
      /*
        Network Error 网络错误
        err.response.status === 401 / err.message 401 代表没有token
        timeout of 10ms exceeded  err.message  请求超时
        根据不同的错误，返回不同的错误提示
        */
      // console.log("响应拦截失败");

      const errCode = {
        401: "没有权限访问当前接口",
        403: "禁止访问当前接口",
        404: "当前资源未找到",
        500: "服务器发生未知错误，情联系管理员"
      };
      let errMessage = "";
      if (err.response) {
        // 接收到响应，响应是失败的响应
        // 根据响应状态码判断错误 401 403 404 500
        errMessage = errCode[err.response.status];
      } else {
        // 说明没接收到，请求失败
        if (err.message.indexOf("Network Error") !== -1) {
          errMessage = "网络连接失败，请联网试试";
        } else if (err.message.indexOf("timeout") !== -1) {
          errMessage = "网络超时，请检查您的网络";
        }
      }
      return Promise.reject(errMessage || "发生未知错误，请联系管理员");
    }
  );

  const handleClick1 = () => {
    axiosInstance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      }
      // data: "username=admin&password=admin",
      /* headers: {
        "content-type": "application/x-www-form-urlencoded"
      } */
    })
      .then(response => {
        console.log(response);

        /* if (response.data.status === 0) {
          token = response.data.data.token;
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        } */
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick2 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/add",
      data: { categoryName: "电脑" }
      // headers: { authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.status === 0) {
          id = response.data.data._id;
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error(err);
      });
  };

  const handleClick3 = () => {
    axiosInstance({
      method: "POST",
      url: "/category/delete",
      data: { categoryId: id }
      // headers: { authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success("删除成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>登录</button>
      <button onClick={handleClick2}>添加</button>
      <button onClick={handleClick3}>删除</button>
    </div>
  );
}

/* export default function Test() {
  let token = "";
  let id = "";

  const handleClick1 = () => {
    axios({
      method: "POST",
      url: "/api/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          token = response.data.data.token;
          message.success("登录成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick2 = () => {
    axios({
      method: "POST",
      url: "/api/category/add",
      data: { categoryName: "电脑" },
      headers: { authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.data.status === 0) {
          id = response.data.data._id;
          message.success("添加成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  const handleClick3 = () => {
    axios({
      method: "POST",
      url: "/api/category/delete",
      data: { categoryId: id },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          message.success("删除成功");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
        message.error("网络错误");
      });
  };

  return (
    <div>
      <button onClick={handleClick1}>登录</button>
      <button onClick={handleClick2}>添加</button>
      <button onClick={handleClick3}>删除</button>
    </div>
  );
} */
