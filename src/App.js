import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'react-select/dist/react-select.css';
import GA from './utils/GoogleAnalytics'
import LoadingComponent from './components/LoadingComponent';

const AsyncMain = Loadable({
  loader: () => import('./containers/Main'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          { GA.init() && <GA.RouteTracker /> }
          <Switch>
            <Route path='/' component={AsyncMain} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
