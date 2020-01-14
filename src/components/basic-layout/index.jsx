import { Layout, Breadcrumb } from "antd";
import React, { Component } from "react";

import LeftNav from "./left-nav/index";
import HeaderMain from "./header-main/index";
import logo from "../../assets/imgs/tx.png";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    const { isDisplay } = this.state;
    this.setState({ collapsed, isDisplay: !isDisplay });
  };

  render() {
    const { isDisplay, collapsed } = this.state;
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            <h1 style={{ display: isDisplay ? "block" : "none" }}>
              联邦局后台
            </h1>
          </div>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, height: 80 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
