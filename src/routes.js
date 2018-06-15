import React from 'react';
import Loadable from 'react-loadable';
import FormatContext from './context/FormatContext';
import LoadingComponent from './components/LoadingComponent';

const AsyncPlayers = Loadable({
  loader: () => import('./containers/PlayersContainer'),
  loading: LoadingComponent,
  render: (loaded, props) => {
    let Component = loaded.default;
    return (
      <FormatContext.Consumer>
        {superFlex => <Component {...props} superFlex={superFlex} />}
      </FormatContext.Consumer>
    )
  }
});

const AsyncTradeCalculator = Loadable({
  loader: () => import('./containers/TradeCalculatorContainer'),
  loading: LoadingComponent
});

export const appRoutes = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    path: '/app/dashboard',
    routeComponent: null,
    icon: 'dashboard',
    key: 0
  },
  {
    name: 'Players',
    title: 'Players',
    path: '/app/players',
    routeComponent: AsyncPlayers,
    icon: 'usergroup-add',
    key: 1,
  },
  {
    name: 'Trade Calculator',
    title: 'Dynasty Trade Calculator',
    path: '/app/calculator',
    routeComponent: AsyncTradeCalculator,
    icon: 'calculator',
    key: 2,
  }
]