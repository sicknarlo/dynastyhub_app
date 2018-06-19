import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { toSuperflex, generateADPs, roundNumber, value } from '../../utils';
import Dashboard from '../../components/Dashboard';

class DashboardContainer extends Component {
  state = {
    players: [],
    news: [],
    loadingNews: false,
  }
  async componentDidMount() {
    this.setState({ loadingNews: true, news: [] });
    const newsResponse = await fetch(`https://dynastyhub-api.herokuapp.com/api/v1/news/latest`);
    this.setState({ loadingNews: false, news: await newsResponse.json() })
    this.generateDashboard();
  }
  generateDashboard() {
    let players = this.props.rawPlayers;
    if (this.props.superflex) {
      players = players.map(x => ({
        ...x,
        picks: x.picks.map(y => ({ ...y, pick: toSuperflex({ pos: x.position, pick: y.pick })})),
        rank: x.rank ? {
          avg: toSuperflex({ pos: x.position, pick: x.rank.avg }),
          min: toSuperflex({ pos: x.position, pick: x.rank.min }),
          max: toSuperflex({ pos: x.position, pick: x.rank.max }),
          stdev: x.rank.stdev
        } : null
      }))
    }
    this.setState({
      players: players.map(x => {
        const adps = generateADPs(x.picks);
        const adp = adps.length ? adps[adps.length - 1].pick : 500;
        return {
          ...x,
          adp,
          trend: adps.length ? roundNumber(adps[0].pick - adps[adps.length - 1].pick) : 0,
          opportunity: x.rank && x.rank.avg && adp ? roundNumber(adp - x.rank.avg) : 0,
          rank: x.rank ? x.rank.avg : null,
          value: value(adp),
        }
      }),
      loading: false,
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.superflex !== this.props.superflex) {
      this.setState({ loading: true });
      this.generateDashboard();
    }
    if (!prevProps.rawPlayers.length && this.props.rawPlayers.length) {
      this.generateDashboard();
    }
  }
  render() {
    const { players, news, loadingNews } = this.state;
    const topFallers = players.slice().filter(x => x.position !== 'PICK' && x.adp < 200).sort((a, b) => a.trend - b.trend).slice(0, 25);
    const topRisers = players.slice().filter(x => x.position !== 'PICK' && x.adp < 200).sort((a, b) => b.trend - a.trend).slice(0, 25);
    const worstValues = players.slice().filter(x => x.position !== 'PICK' && x.adp < 200).sort((a, b) => a.opportunity - b.opportunity).slice(0, 25);
    const bestValues = players.slice().filter(x => x.position !== 'PICK' && x.adp < 200).sort((a, b) => b.opportunity - a.opportunity).slice(0, 25);
    const top100Players = players.slice().filter(x => x.position !== 'PICK' && x.adp < 101);
    const newsWithPlayers = news.map(x => {
      const newsPlayers = x.players.map(y => {
        const playerMatch = players.find(z => z._id === y);
        return playerMatch ? { name: playerMatch.name, _id: playerMatch._id } : null
      })
      return {
        ...x,
        players: newsPlayers.filter(y => y)
      }
    })
    return (
      <Dashboard
        players={players}
        topRisers={topRisers}
        topFallers={topFallers}
        bestValues={bestValues}
        worstValues={worstValues}
        top100Players={top100Players}
        news={newsWithPlayers}
        loadingNews={loadingNews}
      />
    )
  }
}

export default withRouter(
  connect(
    state => ({
      rawPlayers: state.players.items,
      isFetchingPlayers: state.players.isFetching,
      superflex: state.format.superflex,
    }),
    {}
  )(DashboardContainer)
);
