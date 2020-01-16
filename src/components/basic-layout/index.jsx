import { Layout, Breadcrumb } from "antd";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import LeftNav from "./left-nav/index";
import HeaderMain from "./header-main/index";
import logo from "../../assets/imgs/tx.png";
import withCheckLogin from "../../containers/with_check_login";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

@withCheckLogin
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
              <FormattedMessage id="title" />
            </h1>
          </div>
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0, height: 80 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: "20px 16px 20px 16px" }}>
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
