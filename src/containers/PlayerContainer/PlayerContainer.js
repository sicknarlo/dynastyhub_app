import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Timeline, Icon } from 'antd';
import moment from 'moment';
import { generateADPs, generateRanges, toSuperflex } from '../../utils';
import Player from '../../components/Player';

class PlayerContainer extends Component {
  state = {
    rawPlayer: null,
    player: null,
    loading: false,
    timelineTypes: ['news', 'pick', 'trade']
  }
  formatPlayer() {
    const { rawPlayer } = this.state;
    if (this.props.superflex) {
      const picks = rawPlayer.picks.map(x => ({
        pick: toSuperflex({ pos: rawPlayer.position, pick: x.pick }),
        date: x.date
      }))
      const trades = rawPlayer.trades.filter(x => x.format === 'super');
      const ranks = rawPlayer.ranks.map(x => ({
        avg: toSuperflex({ pos: rawPlayer.position, pick: x.avg }),
        min: toSuperflex({ pos: rawPlayer.position, pick: x.min }),
        max: toSuperflex({ pos: rawPlayer.position, pick: x.max }),
        stdev: x.stdev,
        date: x.date,
      }));
      return this.setState({
        player: {
          ...rawPlayer,
          picks,
          adps: generateADPs(picks),
          trades,
          ranks,
          events: picks.map(x => ({
            date: x.date,
            item: (
              <Timeline.Item color='green' dot={<Icon type='user-add' style={{ fontSize: '16px' }} />}>
                {`Selected with pick ${x.pick} - ${moment(x.date).format('YYYY-MM-DD')}`}
              </Timeline.Item>),
            type: 'pick'
            }))
            .concat(trades.map(x => ({
              date: x.date,
              item: (
                <Timeline.Item color='red' dot={<Icon type='swap' style={{ fontSize: '16px' }} />}>
                  {`${x.team1Strings.join(' & ')} for ${x.team2Strings.join(' & ')} - ${moment(x.date).format('YYYY-MM-DD')}`}
                </Timeline.Item>),
              type: 'trade'
              })))
            .concat(rawPlayer.news.map(x => ({
              date: x.date,
              item: (
                <Timeline.Item color='blue' dot={<Icon type='message' style={{ fontSize: '16px' }} />}>
                  <a href={x.link}>{`${x.title} - ${moment(x.date).format('YYYY-MM-DD')}`}</a>
                </Timeline.Item>),
              type: 'news'
              })))
            .sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1),
          ranges: generateRanges(picks)
        },
        loading: false,
      })
    }
    this.setState({
      player: {
        ...rawPlayer,
        adps: generateADPs(rawPlayer.picks),
        trades: rawPlayer.trades.filter(x => x.format === 'ppr'),
        ffcAdps: rawPlayer.adps.filter(x => x.source === 'ffc'),
        events: rawPlayer.picks.map(x => ({
          date: x.date,
          item: (
            <Timeline.Item color='green' dot={<Icon type='user-add' style={{ fontSize: '16px' }} />}>
              {`Selected with pick ${x.pick} - ${moment(x.date).format('YYYY-MM-DD')}`}
            </Timeline.Item>),
          type: 'pick'
          }))
          .concat(rawPlayer.trades.map(x => ({
            date: x.date,
            item: (
              <Timeline.Item color='red' dot={<Icon type='swap' style={{ fontSize: '16px' }} />}>
                {`${x.team1Strings.join(' & ')} for ${x.team2Strings.join(' & ')} - ${moment(x.date).format('YYYY-MM-DD')}`}
              </Timeline.Item>),
            type: 'trade'
            })))
          .concat(rawPlayer.news.map(x => ({
            date: x.date,
            item: (
              <Timeline.Item color='blue' dot={<Icon type='message' style={{ fontSize: '16px' }} />}>
                <a href={x.link}>{`${x.title} - ${moment(x.date).format('YYYY-MM-DD')}`}</a>
              </Timeline.Item>),
            type: 'news'
            })))
          .sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1),
        ranges: generateRanges(rawPlayer.picks)
      },
      loading: false,
    })
  }
  async componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params._playerId) {
      this.setState({ loading: true, rawPlyer: null, player: null });
      const playerResponse = await fetch(`https://dynastyhub-api.herokuapp.com/api/v1/player/${match.params._playerId}`);
      const basePlayer = await playerResponse.json();
      this.setState({ rawPlayer: basePlayer });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.rawPlayer && this.state.rawPlayer) {
      this.formatPlayer();
    }
    if (prevProps.superflex !== this.props.superflex) {
      this.formatPlayer();
    }
  }
  updateTimelineTypes = (values) => {
    this.setState({ timelineTypes: values })
  }
  render() {
    const { players } = this.props;
    const { player, timelineTypes } = this.state;
    return (
      <Player player={player} players={players} timelineTypes={timelineTypes} updateTimelineTypes={this.updateTimelineTypes} />
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
    {}
  )(PlayerContainer)
);
