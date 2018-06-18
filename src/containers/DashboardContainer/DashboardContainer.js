import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard';

class DashboardContainer extends Component {
  render() {
    const { players, isFetching } = this.props;
    return (
      <Dashboard
        players={players}
      />
    )
  }
}

export default withRouter(
  connect(
    state => ({
      players: state.players.items,
      isFetchingPlayers: state.players.isFetching
    }),
    {}
  )(DashboardContainer)
);
