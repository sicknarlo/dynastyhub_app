import Loadable from 'react-loadable';
import LoadingComponent from './components/LoadingComponent';

const AsyncPlayers = Loadable({
  loader: () => import('./containers/PlayersContainer'),
  loading: LoadingComponent,
});

const AsyncTradeCalculator = Loadable({
  loader: () => import('./containers/TradeCalculatorContainer'),
  loading: LoadingComponent
});

const AsyncDashboard = Loadable({
  loader: () => import('./containers/DashboardContainer'),
  loading: LoadingComponent
});
const AsyncPlayer = Loadable({
  loader: () => import('./containers/PlayerContainer'),
  loading: LoadingComponent
});

const AsyncFAQ = Loadable({
  loader: () => import('./components/FAQ'),
  loading: LoadingComponent
});


export const appRoutes = [
  {
    name: 'Dashboard',
    title: 'Dashboard',
    path: '/',
    routeComponent: AsyncDashboard,
    icon: 'dashboard',
    key: 0
  },
  {
    name: 'ADP',
    title: 'ADP',
    path: '/adp',
    routeComponent: AsyncPlayers,
    icon: 'usergroup-add',
    key: 1,
  },
  {
    name: 'Trade Calculator',
    title: 'Dynasty Trade Calculator',
    path: '/dynasty-trade-calculator',
    routeComponent: AsyncTradeCalculator,
    icon: 'calculator',
    key: 2,
  },
  {
    name: 'Player',
    title: 'Player',
    path: '/players/:_playerId',
    routeComponent: AsyncPlayer,
  },
  {
    name: 'FAQ',
    title: 'FAQ',
    path: '/faq',
    routeComponent: AsyncFAQ,
    icon: 'calculator',
    key: 3,
  },
]
