import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import 'react-select/dist/react-select.css';
import LoadingComponent from './components/LoadingComponent';

const AsyncMain = Loadable({
  loader: () => import('./containers/Main'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/app' component={AsyncMain} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
