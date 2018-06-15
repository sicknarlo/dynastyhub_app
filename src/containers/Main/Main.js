import React, { Component } from 'react';
import { withRouter } from 'react-router'
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
    this.setState({
      pickCount: await pickCountResponse.json()
    })
  }
  toggleSidebar = () => this.setState({ sidebarCollapsed: !this.state.sidebarCollapsed });
  toggleSuper = () => this.setState({ superFlex: !this.state.superFlex })
  render() {
    const { sidebarCollapsed, pickCount, superFlex } = this.state;
    const { location } = this.props;

    return (
      <FormatContext.Provider value={superFlex}>
        <AppView
          sidebarCollapsed={sidebarCollapsed}
          toggleSidebar={this.toggleSidebar}
          location={location}
          pickCount={pickCount}
          superFlex={superFlex}
          toggleSuper={this.toggleSuper}
        />
      </FormatContext.Provider>
    )
  }
}

export default withRouter(Main);
