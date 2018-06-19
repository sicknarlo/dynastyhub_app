import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchPlayers } from '../../actions/players.actions';
import { setSuper } from '../../actions/format.actions';
import AppView from '../../components/AppView';

class Main extends Component {
  state = {
    sidebarCollapsed: window.matchMedia('(max-width: 767px)').matches,
    pickCount: 0,
  }
  async componentDidMount() {
    const pickCountResponse = await fetch('https://dynastyhub-api.herokuapp.com/api/v1/pickcount');
    this.props.fetchPlayers();
    this.setState({
      pickCount: await pickCountResponse.json()
    })
    const savedSuperflex = localStorage.getItem('superflex');
    if (savedSuperflex) {
      this.props.setSuper(savedSuperflex === '1' ? true : false)
    }
  }
  toggleSidebar = () => this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  toggleSuper = () => {
    localStorage.setItem('superflex', this.props.superflex === false ? '1' : '0');
    this.props.setSuper(!this.props.superflex)
  }
  render() {
    const { sidebarCollapsed, pickCount } = this.state;
    const { location, isFetchingPlayers, superflex } = this.props;

    return (
      <AppView
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={this.toggleSidebar}
        location={location}
        pickCount={pickCount}
        superFlex={superflex}
        toggleSuper={this.toggleSuper}
        loading={isFetchingPlayers}
      />
    )
  }
}

export default withRouter(
  connect(
    state => ({
      players: state.players.items,
      isFetchingPlayers: state.players.isFetching,
      superflex: state.format.superflex
    }),
    { fetchPlayers, setSuper }
  )(Main)
);
