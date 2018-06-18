import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Timeline, Icon } from 'antd';
import moment from 'moment';
import { generateADPs, generateRanges } from '../../utils';
import Player from '../../components/Player';

class PlayerContainer extends Component {
  state = {
    player: null,
    loading: false,
    timelineTypes: ['news', 'pick', 'trade']
  }
  async componentDidMount() {
    const { match } = this.props;
    if (match && match.params && match.params._playerId) {
      this.setState({ loading: true, player: null });
      const playerResponse = await fetch(`https://dynastyhub-api.herokuapp.com/api/v1/player/${match.params._playerId}`);
      const basePlayer = await playerResponse.json();
      this.setState({
        player: {
          ...basePlayer,
          adps: generateADPs(basePlayer.picks),
          trades: basePlayer.trades.filter(x => x.format === 'ppr'),
          events: basePlayer.picks.map(x => ({
            date: x.date,
            item: (
              <Timeline.Item color='green' dot={<Icon type='user-add' style={{ fontSize: '16px' }} />}>
                {`Selected with pick ${x.pick} - ${moment(x.date).format('YYYY-MM-DD')}`}
              </Timeline.Item>),
            type: 'pick'
            }))
            .concat(basePlayer.trades.map(x => ({
              date: x.date,
              item: (
                <Timeline.Item color='red' dot={<Icon type='swap' style={{ fontSize: '16px' }} />}>
                  {`${x.team1Strings.join(' & ')} for ${x.team2Strings.join(' & ')} - ${moment(x.date).format('YYYY-MM-DD')}`}
                </Timeline.Item>),
              type: 'trade'
              })))
            .concat(basePlayer.news.map(x => ({
              date: x.date,
              item: (
                <Timeline.Item color='blue' dot={<Icon type='message' style={{ fontSize: '16px' }} />}>
                  <a href={x.link}>{`${x.title} - ${moment(x.date).format('YYYY-MM-DD')}`}</a>
                </Timeline.Item>),
              type: 'news'
              })))
            .sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1),
          ranges: generateRanges(basePlayer.picks)
        },
        loading: false,
      })
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
      isFetchingPlayers: state.players.isFetching
    }),
    {}
  )(PlayerContainer)
);
