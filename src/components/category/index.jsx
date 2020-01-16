import React, { Component } from "react";
import { Card, Button, Icon, Table } from "antd";
import { connect } from "react-redux";

import { getCategoryListAsync } from "../../redux/actions";

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync
})
class category extends Component {
  componentDidMount() {
    this.props.getCategoryListAsync();
  }
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      dataIndex: "operation",
      render() {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];

  render() {
    const { categories } = this.props;

    /* const data = [
      {
        key: "1",
        categoryName: "手枪"
      },
      {
        key: "2",
        categoryName: "巴雷特"
      },
      {
        key: "3",
        categoryName: "手枪"
      },
      {
        key: "4",
        categoryName: "巴雷特"
      }
    ]; */

    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary">
              <Icon type="plus" />
              分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            pagination={{
              showSizeChanger: true, // 是否显示改变pageSize
              showQuickJumper: true, // 是否显示快速跳转
              pageSizeOptions: ["3", "6", "9"],
              defaultPageSize: 3
            }}
            rowKey="_id"
          />
        </Card>
      </div>
    );
  }
}

export default category;
