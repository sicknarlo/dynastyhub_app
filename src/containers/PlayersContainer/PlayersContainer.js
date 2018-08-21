import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { roundNumber, value, generateADPs, toSuperflex } from '../../utils';
import Players from '../../components/Players';

class PlayersContainer extends Component {
  state = {
    players: [],
    loading: false,
    sorter: (a, b) => a.adp - b.adp,
    searchValue: '',
    positions: [
      'QB',
      'RB',
      'WR',
      'TE',
      'Pick',
      'Rookie'
    ],
    lastFormat: this.props.superFlex
  }
  positionOptions = [
    'QB',
    'RB',
    'WR',
    'TE',
    'Pick',
    'Rookie'
  ]
  componentDidMount() {
    this.generatePlayers();
  }
  generatePlayers() {
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
        if (x.name === 'Todd Gurley') console.log(x.picks)
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
      this.generatePlayers();
    }
    if (!prevProps.rawPlayers.length && this.props.rawPlayers.length) {
      this.generatePlayers();
    }
  }
  handleSearchChange = ({ target }) => {
    this.setState({ searchValue: target.value });
  }
  playerSorters = {
    'adp': {
      ascend: (a, b) => a.adp - b.adp,
      descend: (a, b) => b.adp - a.adp,
    },
    'opportunity': {
      ascend: (a, b) => {
        if (!a.rank) return 1;
        if (!b.rank) return -1;
        return a.opportunity - b.opportunity;
      },
      descend: (a, b) => {
        if (!a.rank) return 1;
        if (!b.rank) return -1;
        return b.opportunity - a.opportunity;
      }
    },
    'rank': {
      ascend: (a, b) => {
        if (!a.rank) return 1;
        if (!b.rank) return -1;
        return a.rank - b.rank;
      },
      descend: (a, b) => {
        if (!a.rank) return 1;
        if (!b.rank) return -1;
        return b.rank - a.rank;
      }
    },
  }
  handleTableChange = (pagination, filters, sorter) => {
    if (!Object.keys(sorter).length) return null;
    const direction = sorter.order;
    const field = sorter.columnKey;
    const sorterFunc = this.playerSorters[field][direction];
    this.setState({
      sorter: sorterFunc,
    });
  }
  handlePositionFilterChange = (values) => {
    this.setState({ positions: values })
  }
  filterPlayers = (players) => {
    const { positions, searchValue } = this.state;
    return players.filter((x) => {
      if (searchValue !== '' && x.name && !x.name.toLowerCase().includes(searchValue.toLowerCase())) return false;
      if (positions.includes('Pick') && x.position === 'PICK') return true;
      if (positions.includes('Rookie') && x.status === 'rookie') return true;
      return positions.includes(x.position);
    })
  }
  render() {
    const { players, loading, sorter, searchValue, positions } = this.state;
    const filteredPlayers = this.filterPlayers(players);
    const sortedFilteredPlayers = filteredPlayers.sort(sorter);
    return <Players
              players={sortedFilteredPlayers}
              loading={loading}
              handleTableChange={this.handleTableChange}
              searchValue={searchValue}
              handleSearchChange={this.handleSearchChange}
              positionOptions={this.positionOptions}
              positions={positions}
              handlePositionFilterChange={this.handlePositionFilterChange}
            />;
  }
}

export default withRouter(
  connect(
    state => ({
      rawPlayers: state.players.items,
      isFetchingPlayers: state.players.isFetching,
      superflex: state.format.superflex
    }),
    {}
  )(PlayersContainer)
);
