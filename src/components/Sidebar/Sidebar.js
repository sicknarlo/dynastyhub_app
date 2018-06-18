import React from 'react';
import { Layout, Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { appRoutes } from '../../routes';
import { Brand } from './styles';

const { Sider } = Layout;

const Sidebar =  ({ sidebarCollapsed, location, superFlex, toggleSuper }) => {
  const desktopBrandStyles = { display: sidebarCollapsed ? 'none' : '' };
  const pathname = location.pathname;
  const selectedKeys = [String(appRoutes.findIndex(x => x.path === pathname))];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
      collapsedWidth={0}
      breakpoint="sm"
    >
      <Brand>
        <div style={desktopBrandStyles}>DynastyFF Tools</div>
      </Brand>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
        {appRoutes.filter(x => x.icon).map((x) =>
          <Menu.Item key={x.key}>
            <Icon type={x.icon} />
            <Link style={{ display: 'inline' }} to={x.path}>{x.name}</Link>
          </Menu.Item>
        )}
        <Menu.Item onClick={toggleSuper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
              Superflex
              <Switch
                checked={superFlex}
                onChange={toggleSuper}
                checkedChildren="On"
                unCheckedChildren="Off"
              />
            </div>
          </Menu.Item>
      </Menu>
    </Sider>
  );
}

Sidebar.propTypes = {
  sidebarCollapsed: PropTypes.bool
};

export default Sidebar;
