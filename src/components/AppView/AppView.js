import React from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import generateRandomLoadingMessage from '../../utils/generateRandomLoadingMessage';
import { appRoutes } from '../../routes';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { AppContent } from './styles';

const AppView = ({
  sidebarCollapsed,
  toggleSidebar,
  location,
  pickCount,
  superFlex,
  toggleSuper,
  loading,
}) => {
  const matchedRoute = appRoutes.find(x => x.path === location.pathname);
  if (loading) return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
      <Spin size='large' tip={generateRandomLoadingMessage()}/>
    </div>
  )
  return (
    <Layout style={{ height: '100vh' }}>
      <Sidebar sidebarCollapsed={sidebarCollapsed} location={location} superFlex={superFlex} toggleSuper={toggleSuper} />
      <Layout>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <AppContent>
          <h1>{matchedRoute && matchedRoute.name}</h1>
          <div style={{ marginTop: '15px' }}>
            <Switch>
              {appRoutes.map(x =>
                <Route
                  exact
                  path={x.path}
                  component={x.routeComponent}
                  key={x.name}
                />
              )}
              <Redirect from="/players" to="/adp"/>
            </Switch>
          </div>
        </AppContent>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <div>Created by sicknarlo 2014-2018</div>
          <div>Powered by {pickCount.toLocaleString()} draft picks and counting</div>
          <div>Thanks to <a href='www.myfantasyleague.com'>MFL</a>,  <a href='www.fantasyfootballcalculator.com'>Fantasy Football Calculator</a>, and <a href='www.fantasypros.com'>FantasyPros</a></div>
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
