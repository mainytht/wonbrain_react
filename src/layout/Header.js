import React from 'react';
import { Affix, Menu, Dropdown } from 'antd';
// import {Link,withRouter, history as router} from 'umi';
import { Link, withRouter } from 'umi';
import { UserSwitchOutlined } from '@ant-design/icons';

const MenuItem = Menu.Item;
const index = ({ history, location }) => {
  const onLogout = () => {
    localStorage.clear();
    history.push('/login');
  };
  const menu = (
    <Menu>
      <MenuItem>
        <span onClick={onLogout}>退出</span>
        <br />
        <span onClick={() => history.push('/usercenter')}>个人中心 </span>
      </MenuItem>
    </Menu>
  );

  return (
    <Affix offsetTop={0}>
      <div className="header">
        <img className="logo" src={require('@/assets/logo2.png')} alt="logo" />
        <Menu
          className="menus"
          mode="horizontal"
          theme="dark"
          selectedKeys={[location.pathname]}
        >
          <MenuItem key="/">
            <Link to="/first">首页</Link>
          </MenuItem>
          <MenuItem key="/markdown">
            <Link to="/markdown">markdown</Link>
          </MenuItem>
          <MenuItem key="/dragmd5">
            <Link to="/dragmd5">dragmd5</Link>
          </MenuItem>
          <MenuItem key="/admin">
            <Link to="/admin">管理</Link>
          </MenuItem>
          <MenuItem key="/usereducer">
            <Link to="/usereducer">useReducer</Link>
          </MenuItem>
          <MenuItem key="/visjs">
            <Link to="/visjs">vjsjs</Link>
          </MenuItem>
          <MenuItem key="/cyto">
            <Link to="/cyto">cyto</Link>
          </MenuItem>
          <MenuItem key="/mockdemo">
            <Link to="/mockdemo">mockdemo</Link>
          </MenuItem>
          <MenuItem key="/test">
            <Link to="/test">test</Link>
          </MenuItem>
        </Menu>
        <div className="right">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              <UserSwitchOutlined /> {localStorage.nickname}
            </a>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default withRouter(index);
