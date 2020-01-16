import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import dayjs from "dayjs";

import { removeItem } from "../../../utils/storage";
import { removeUser, changeLanguage } from "../../../redux/actions";
import menus from "../../../config/menus";
import "./index.less";

const { confirm } = Modal;

@injectIntl
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
@withRouter
class HeaderMain extends Component {
  state = {
    isScreenfull: false,
    date: Date.now()
  };

  componentDidMount() {
    screenfull.on("change", this.handleScreenFullChange);
    this.time = setInterval(() => {
      this.setState({
        date: Date.now()
      });
    }, 1000);
  }

  handleScreenFullChange = () => {
    this.setState({
      isScreenfull: !this.state.isScreenfull
    });
  };

  componentWillUnmount() {
    screenfull.off("change", this.handleScreenFullChange);
    clearInterval(this.time);
  }

  screenFull = () => {
    screenfull.toggle();
  };

  logout = () => {
    const { intl } = this.props;
    confirm({
      title: intl.formatMessage({ id: "quit" }),

      onOk: () => {
        // 清空用户数据
        removeItem("user");
        this.props.removeUser();

        // 跳转到login
        this.props.history.replace("/login");
      }
      // onCancel() {}
    });
  };

  findTitle = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      // 二级菜单
      if (menu.children) {
        for (let index = 0; index < menu.children.length; index++) {
          const cMenu = menu.children[index];
          if (cMenu.path === pathname) {
            return cMenu.title;
          }
        }
      } else {
        // 一级菜单
        if (menu.path === pathname) {
          return menu.title;
        }
      }
    }
  };

  changeLanguage = () => {
    const language = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(language);
  };

  render() {
    const { isScreenfull, date } = this.state;
    const {
      username,
      language,
      location: { pathname }
    } = this.props;

    const title = this.findTitle(menus, pathname);

    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button
            className="header-main-lang"
            size="small"
            onClick={this.changeLanguage}
          >
            {language === "en" ? "中文" : "English"}
          </Button>
          <span>hello，{username}</span>
          <Button size="small" type="link" onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-bottom-left">
            <FormattedMessage id={title} />
          </span>
          <span className="header-main-bottom-right">
            {dayjs(date).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      </div>
    );
  }
}

export default HeaderMain;
