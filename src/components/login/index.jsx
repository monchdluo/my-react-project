import React, { Component } from "react";

import { Form, Icon, Input, Button } from "antd";
// 图片必须引入，才能被打包
import logo from "./logo.jpg";
import "./index.less";

class Login extends Component {
  // 自定义表单校验规则
  validator = (rule, value, callback) => {
    /* rule.field 获取表单key
      value 获取表单value
    */
    const name = rule.field === "username" ? "用户名" : "密码";

    const reg = /^\w+$/;
    if (!value) {
      // 输入值为空
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }

    /* 
    callback()调用不传参，代表表单校验成功
    callback(message)调用传参，代表表单校验失败，会提示message
   */

    // 必须调用callback，否则会出问题
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>FBI特工身份验证中心</h1>
        </header>
        <section className="login-section">
          <h3>FBI特工登录</h3>
          <Form className="login-form">
            <Form.Item>
              {/* 高阶组件，用来表单校验 */}
              {getFieldDecorator("username", {
                rules: [{ validator: this.validator }]
              })(
                <Input
                  className="input-username"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validator }]
              })(
                <Input
                  className="input-password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="login-form-btn">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

// 高阶组件，给Login传递form属性
export default Form.create()(Login);
