import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import menus from "../../../config/menus";
const { SubMenu, Item } = Menu;

@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        // 二级菜单
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>
                  <FormattedMessage id={menu.title} />
                </span>
              </span>
            }
          >
            {menu.children.map(cMenu => this.createMenuItem(cMenu))}
          </SubMenu>
        );
      } else {
        // 一级菜单
        return this.createMenuItem(menu);
      }
    });
  };

  createMenuItem = menu => {
    // 复用代码
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>
            <FormattedMessage id={menu.title} />
          </span>
        </Link>
      </Item>
    );
  };

  findOpenKeys = (pathname, menus) => {
    // 遍历数据
    const menu = menus.find(menu => {
      if (menu.children) {
        return menu.children.find(cMenu => cMenu.path === pathname);
      }
    });
    if (menu) {
      return menu.path;
    }
  };

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKeys(pathname, menus);
    return (
      <Menu
        theme="dark" // 主题颜色
        defaultSelectedKeys={[pathname]} // 默认选择菜单
        defaultOpenKeys={[openKey]} // 默认展开的菜单
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}

export default LeftNav;
