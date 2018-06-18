import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchPlayers } from '../../actions/players.actions';
import FormatContext from '../../context/FormatContext';
import AppView from '../../components/AppView';

class Main extends Component {
  state = {
    sidebarCollapsed: window.matchMedia('(max-width: 767px)').matches,
    pickCount: 0,
    superFlex: false,
  }
  async componentDidMount() {
    const pickCountResponse = await fetch('https://dynastyhub-api.herokuapp.com/api/v1/pickcount');
    this.props.fetchPlayers();
    this.setState({
      pickCount: await pickCountResponse.json()
    })
  }
  toggleSidebar = () => this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  toggleSuper = () => this.setState({ superFlex: !this.state.superFlex })
  render() {
    const { sidebarCollapsed, pickCount, superFlex } = this.state;
    const { location, players, isFetchingPlayers } = this.props;

    return (
      <FormatContext.Provider value={superFlex}>
        <AppView
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={this.toggleSidebar}
          location={location}
          pickCount={pickCount}
          superFlex={superFlex}
          toggleSuper={this.toggleSuper}
          loading={isFetchingPlayers}
        />
      </FormatContext.Provider>
    )
  }
}

export default withRouter(
  connect(
    state => ({
      players: state.players.items,
      isFetchingPlayers: state.players.isFetching
    }),
    { fetchPlayers }
  )(Main)
);
