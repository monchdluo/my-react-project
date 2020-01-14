import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { connect } from "react-redux";

import { saveUserAsync } from "../../redux/actions";
import withCheckLogin from "../with_check_login";

// 图片必须引入，才能被打包
import logo from "../../assets/imgs/logo.jpg";
import "./index.less";

const { Item } = Form;

@withCheckLogin
@connect(null, { saveUserAsync })
@Form.create()
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

  login = e => {
    e.preventDefault();

    // 我要干啥？校验表单，收集表单数据，发送请求，然后登陆成功
    // 校验表单并收集表单数据
    this.props.form.validateFields((err, values) => {
      // err是错误对象，如果失败就有错，值为对象，如果成功，就没错，值为null

      if (!err) {
        // 来到这，说明成功
        const { username, password } = values;
        // 发送请求
        /* axios
          .post("./api/login", { username, password })
          .then(response => {
            // 请求成功了

            // 是否成功
            if (response.data.status === 0) {
              // 来到这代表登录成功
              this.props.history.replace("/");
            } else {
              // 来到这代表失败
              // 需要提示错误
              message.error(response.data.msg);
              // 再清空密码
              this.props.form.resetFields(["password"]);
            }
          })
          .catch(err => {
            // 请求失败
            console.log(err);
            // 将错误提示
            message.error("网络错误！");
            // 再次清空
            this.props.form.resetFields(["password"]);
          }); */

        // 得到登录成功/失败
        this.props
          .saveUserAsync(username, password)
          .then(() => {
            this.props.history.replace("/");
          })
          .catch(msg => {
            message.error(msg);
            this.props.form.resetFields(["password"]);
          });
      }
    });
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
          <Form className="login-form" onSubmit={this.login}>
            <Item>
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
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validator }]
              })(
                <Input
                  className="input-password"
                  type="password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                className="login-form-btn"
                htmlType="submit"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

// 高阶组件，给Login传递form属性
export default Login;
