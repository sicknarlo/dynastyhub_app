import React, { Component } from 'react';
import { Timeline } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { value, roundNumber, toSuperflex } from '../../utils';
import TradeCalculator from '../../components/TradeCalculator';

class TradeCalculatorContainer extends Component {
  state = {
    players: [],
    team1: [],
    team2: [],
    fullTeam1: [],
    fullTeam2: [],
    showResults: false,
    currentTab: '1',
    penalty: 0.05,
    alertCount: 0
  }
  // async componentDidMount() {
  //   this.setState({
  //     players: [],
  //     loading: true
  //   })
  //   const playerFetch = await fetch(`https://dynastyhub-api.herokuapp.com/api/v1/player?fields=name,team,position`);
  //   const players = await playerFetch.json();
  //   this.setState({
  //     players,
  //     loading: false,
  //   })
  // }
  changeTeam1 = (value) => this.setState({ team1: value.split(',') });
  changeTeam2 = (value) => this.setState({ team2: value.split(',') });
  toggleResults = () => this.setState({ showResults: !this.state.showResults });
  changeTab = tab => this.setState({ currentTab: tab });
  evaluateTrade = async () => {
    const { team1, team2 } = this.state;
    const cleanedTeam1 = team1.map(x => x.split('-')[0]);
    const cleanedTeam2 = team2.map(x => x.split('-')[0]);
    const response = await fetch(`https://dynastyhub-api.herokuapp.com/api/v1/calculator?team1=${cleanedTeam1.join(',')}&team2=${cleanedTeam2.join(',')}`);
    let { fullTeam1, fullTeam2 } = await response.json();
    let alertCount = 0;
    if (this.props.superflex) {
      fullTeam1 = fullTeam1.map(x => ({
        ...x,
        adps: x.adps.map(y => ({ date: y.date, pick: toSuperflex({ pos: x.position, pick: y.pick })})),
        ranks: x.ranks.map(y => ({ date: y.date, avg: toSuperflex({ pos: x.position, pick: y.avg })})),
      }))
      fullTeam2 = fullTeam2.map(x => ({
        ...x,
        adps: x.adps.map(y => ({ date: y.date, pick: toSuperflex({ pos: x.position, pick: y.pick })})),
        ranks: x.ranks.map(y => ({ date: y.date, avg: toSuperflex({ pos: x.position, pick: y.avg })})),
      }))
      return this.setState({
        showResults: true,
        currentTab: '1',
        fullTeam1: fullTeam1.map(x => {
          const adp = x.adps.length ? roundNumber(x.adps[x.adps.length - 1].pick) : 300;
          const callouts = [];
          x.news && x.news.forEach(x => callouts.push(<Timeline.Item><a href={x.link}>{x.title} | {moment(x.date).format('MM/DD/YY')}</a></Timeline.Item>));
          const rank = x.ranks && x.ranks.length ? x.ranks[x.ranks.length - 1].avg : null;
          const opportunity = rank ? roundNumber(adp - rank) : 0;
          if (opportunity > 9) callouts.push(<Timeline.Item>Player is ranked higher than their ADP which could indicate being underpriced</Timeline.Item>);
          if (opportunity < -9) callouts.push(<Timeline.Item>Player is ranked lower than their ADP which could indicate a high price</Timeline.Item>);
          const trend = x.adps.length ? roundNumber(x.adps[0].pick - x.adps[x.adps.length - 1].pick) : 0;
          if (trend > 15) callouts.push(<Timeline.Item>Player has increased in value by over 15 spots in the past 3 months. Careful valuing players rising so quickly in short periods of time.</Timeline.Item>);
          if (trend < -15) callouts.push(<Timeline.Item>Player has decreased in value by over 15 spots in the past 3 months. Careful valuing players dropping so quickly in short periods of time.</Timeline.Item>);
          alertCount += callouts.length;
          return {
            ...x,
            adp,
            value: value(adp),
            trend,
            callouts,
            rank,
          }
        }),
        fullTeam2: fullTeam2.map(x => {
          const adp = x.adps.length ? roundNumber(x.adps[x.adps.length - 1].pick) : 300;
          const callouts = [];
          x.news && x.news.forEach(x => callouts.push(<Timeline.Item><a href={x.link}>{x.title} | {moment(x.date).format('MM/DD/YY')}</a></Timeline.Item>));
          const rank = x.ranks && x.ranks.length ? x.ranks[x.ranks.length - 1].avg : null;
          const opportunity = rank ? roundNumber(adp - rank) : 0;
          if (opportunity > 9) callouts.push(<Timeline.Item>Player is ranked higher than their ADP which could indicate being underpriced</Timeline.Item>);
          if (opportunity < -9) callouts.push(<Timeline.Item>Player is ranked lower than their ADP which could indicate a high price</Timeline.Item>);
          const trend = x.adps.length ? roundNumber(x.adps[0].pick - x.adps[x.adps.length - 1].pick) : 0;
          if (trend > 15) callouts.push(<Timeline.Item>Player has increased in value by over 15 spots in the past 3 months. Careful valuing players rising so quickly in short periods of time.</Timeline.Item>);
          if (trend < -15) callouts.push(<Timeline.Item>Player has decreased in value by over 15 spots in the past 3 months. Careful valuing players dropping so quickly in short periods of time.</Timeline.Item>);
          alertCount += callouts.length;
          return {
            ...x,
            adp,
            value: value(adp),
            trend,
            callouts,
            rank,
          }
        }),
        alertCount,
      });
    }
    this.setState({
      showResults: true,
      currentTab: '1',
      fullTeam1: fullTeam1.map(x => {
        const adp = x.adps.length ? roundNumber(x.adps[x.adps.length - 1].pick) : 300;
        const callouts = [];
        x.news && x.news.forEach(x => callouts.push(<Timeline.Item><a href={x.link}>{x.title} | {moment(x.date).format('MM/DD/YY')}</a></Timeline.Item>));
        const rank = x.ranks && x.ranks.length ? x.ranks[x.ranks.length - 1].avg : null;
        const opportunity = rank ? roundNumber(adp - rank) : 0;
        console.log(x.name, opportunity)
        if (opportunity > 9) callouts.push(<Timeline.Item>Player is ranked higher than their ADP which could indicate being underpriced</Timeline.Item>);
        if (opportunity < -9) callouts.push(<Timeline.Item>Player is ranked lower than their ADP which could indicate a high price</Timeline.Item>);
        const trend = x.adps.length ? roundNumber(x.adps[0].pick - x.adps[x.adps.length - 1].pick) : 0;
        if (trend > 15) callouts.push(<Timeline.Item>Player has increased in value by over 15 spots in the past 3 months. Careful valuing players rising so quickly in short periods of time.</Timeline.Item>);
        if (trend < -15) callouts.push(<Timeline.Item>Player has decreased in value by over 15 spots in the past 3 months. Careful valuing players dropping so quickly in short periods of time.</Timeline.Item>);
        alertCount += callouts.length;
        return {
          ...x,
          adp,
          value: value(adp),
          trend,
          callouts,
          rank,
        }
      }),
      fullTeam2: fullTeam2.map(x => {
        const adp = x.adps.length ? roundNumber(x.adps[x.adps.length - 1].pick) : 300;
        const callouts = [];
        x.news && x.news.forEach(x => callouts.push(<Timeline.Item><a href={x.link}>{x.title} | {moment(x.date).format('MM/DD/YY')}</a></Timeline.Item>));
        const rank = x.ranks && x.ranks.length ? x.ranks[x.ranks.length - 1].avg : null;
        const opportunity = rank ? roundNumber(adp - rank) : 0;
        if (opportunity > 9) callouts.push(<Timeline.Item>Player is ranked higher than their ADP which could indicate being underpriced</Timeline.Item>);
        if (opportunity < -9) callouts.push(<Timeline.Item>Player is ranked lower than their ADP which could indicate a high price</Timeline.Item>);
        const trend = x.adps.length ? roundNumber(x.adps[0].pick - x.adps[x.adps.length - 1].pick) : 0;
        if (trend > 15) callouts.push(<Timeline.Item>Player has increased in value by over 15 spots in the past 3 months. Careful valuing players rising so quickly in short periods of time.</Timeline.Item>);
        if (trend < -15) callouts.push(<Timeline.Item>Player has decreased in value by over 15 spots in the past 3 months. Careful valuing players dropping so quickly in short periods of time.</Timeline.Item>);
        alertCount += callouts.length;
        return {
          ...x,
          adp,
          value: value(adp),
          trend,
          callouts,
          rank,
        }
      }),
      alertCount,
    });
  }
  render() {
    const { players, loading, team1, team2, showResults, fullTeam1, fullTeam2, currentTab, penalty, alertCount } = this.state;
    const { rawPlayers } = this.props
    const team1Options = rawPlayers.reduce((acc, x) => {
      let value = x._id;
      const name = x.position === 'PICK' ? x.name : `${x.name}, ${x.position} ${x.team}`;
      acc.push({ value, label: name });
      let n = 2;
      while (team1.includes(value)) {
        value = `${x._id}-${n}`;
        acc.push({ value, label: `${name} (${n})` })
        n++;
      }
      return acc;
    }, []);
    const team2Options = rawPlayers.reduce((acc, x) => {
      let value = x._id;
      const name = x.position === 'PICK' ? x.name : `${x.name}, ${x.position} ${x.team}`;
      acc.push({ value, label: name });
      let n = 2;
      while (team2.includes(value)) {
        value = `${x._id}-${n}`;
        acc.push({ value, label: `${name} (${n})` })
        n++;
      }
      return acc;
    }, []);
    let team1Value = fullTeam1.reduce((acc, el) => acc + value(el.adp), 0);
    let team2Value = fullTeam2.reduce((acc, el) => acc + value(el.adp), 0);

    if (fullTeam1.length > fullTeam2.length) team1Value =
      team1Value * (1 - (penalty * (fullTeam1.length - fullTeam2.length)));
    if (fullTeam2.length > fullTeam1.length) team2Value =
      team2Value * (1 - (penalty * (fullTeam2.length - fullTeam1.length)));
    const valueDiff = Number(((Math.min(team1Value, team2Value) / Math.max(team1Value, team2Value)) * 100).toFixed(0));

    return <TradeCalculator
              players={rawPlayers}
              loading={loading}
              team1={team1}
              team1Options={team1Options}
              changeTeam1={this.changeTeam1}
              changeTeam2={this.changeTeam2}
              team2={team2}
              team2Options={team2Options}
              evaluateTrade={this.evaluateTrade}
              showResults={showResults}
              toggleResults={this.toggleResults}
              fullTeam1={fullTeam1}
              fullTeam2={fullTeam2}
              currentTab={currentTab}
              changeTab={this.changeTab}
              team1Value={team1Value}
              team2Value={team2Value}
              penalty={penalty}
              alertCount={alertCount}
              valueDiff={valueDiff}
            />

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
  )(TradeCalculatorContainer)
);
