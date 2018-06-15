import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { appRoutes } from '../../routes';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { AppContent } from './styles';

const AppView = ({ sidebarCollapsed, toggleSidebar, location, pickCount, superFlex, toggleSuper }) => {
  const matchedRoute = appRoutes.find(x => x.path === location.pathname);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar sidebarCollapsed={sidebarCollapsed} location={location} superFlex={superFlex} toggleSuper={toggleSuper} />
      <Layout>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <AppContent>
          <Breadcrumb>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <h1>{matchedRoute.name}</h1>
          <div style={{ marginTop: '15px' }}>
            {appRoutes.map(x =>
              <Route
                exact
                path={x.path}
                component={x.routeComponent}
                key={x.name}
              />
            )}
          </div>
        </AppContent>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <div>Created by sicknarlo 2014-2018</div>
          <div>Powered by {pickCount.toLocaleString()} draft picks and counting</div>
          <div>Thanks to <a href='www.myfantasyleague.com'>MFL</a> and <a href='www.fantasypros.com'>FantasyPros</a></div>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

AppView.propTypes = {
  sidebarCollapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  location: PropTypes.object,
  pickCount: PropTypes.number
};

export default AppView;
