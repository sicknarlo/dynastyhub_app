import React from 'react';
import Select from 'react-select'
import { Spin,
  Button,
  Modal,
  Tabs,
  Icon,
  Table,
  Badge,
  Popover,
  Timeline,
  Alert,
  Progress,
  Card
} from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more';
import { generateRanges } from '../../utils'
import ContentComponent from '../ContentComponent';
HighchartsMore(ReactHighcharts.Highcharts);

const TabPane = Tabs.TabPane;

const CalculatorWrapper = styled.div`
display: flex;
justify-content: space-between;
@media (max-width: 767px) {
  display: block;
}
`

const CalculatorTeam = styled.div`
width: 45%;
margin-bottom: 15px;
@media (max-width: 767px) {
  width: 100%;
}
`

const ResultsModel = styled(Modal)`
.ant-modal-body {
  padding-bottom: 0;
  overflow: scroll;
}
`

const TeamTable = styled(Table)`
.ant-table-body {
  overflow: scroll;
}
td {
  white-space: nowrap;
}
th {
  white-space: nowrap;
}
`

const SuccessProgress = styled(Progress)`
.ant-progress-circle-path {
  stroke: #52c41a;
};
`

const WarningProgress = styled(Progress)`
.ant-progress-circle-path {
  stroke: #faad14;
};
`

const ErrorProgress = styled(Progress)`
.ant-progress-circle-path {
  stroke: #f5222d;
};
`

const FairnessWrapper = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 100%;
.ant-progress {
  margin-right: 30px;
}
@media (max-width: 767px) {
  flex-direction: column;
  .ant-progress {
    margin-right: 30px;
    margin-bottom: 15px;
  }
}
`

const ResultsTabPane = styled(TabPane)`
> * {
  margin-bottom: 15px;
}
`

const ProgressSelector = (progress) => {
  if (progress > 94) return <SuccessProgress type="circle" percent={progress} />
  if (progress > 89) return <Progress type="circle" percent={progress} />
  if (progress > 80) return <WarningProgress type="circle" percent={progress} />
  return <ErrorProgress type="circle" percent={progress} />
}

const statementGenerator = (diffPercentage, team1Value, team2Value) => {
  if (diffPercentage > 95) return 'Trade is fair based on values.';
  const higherTeam = team1Value < team2Value ? 'Team 1' : 'Team 2';
  const lowerTeam = team1Value > team2Value ? 'Team 1' : 'Team 2';
  if (diffPercentage > 90) return `Trade is slightly in favor of ${higherTeam} depending on team needs`
  if (diffPercentage > 85) return `Trade is slightly in favor of ${higherTeam}, ${lowerTeam} should consider throwing something in`
  if (diffPercentage > 80) return `Trade is in favor of ${higherTeam}, ${lowerTeam} should add to the trade`
  return `Trade heavily favors ${higherTeam}`;
}

const TradeCalculator = ({
  players,
  loading,
  team1,
  team2,
  changeTeam1,
  team1Options,
  team2Options,
  changeTeam2,
  evaluateTrade,
  showResults,
  toggleResults,
  fullTeam1,
  fullTeam2,
  currentTab,
  changeTab,
  team1Value,
  team2Value,
  penalty,
  alertCount,
  valueDiff
}) => {
  if (loading) return <Spin />;
  const teamColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (name, player) => player.callouts && player.callouts.length
      ? (
        <Popover content={(
          <Timeline>
            {player.callouts.map(x => x)}
          </Timeline>
        )} title="News" trigger="hover">
          <Badge dot>
            {name}
          </Badge>
        </Popover>
      )
      : name
    },
    { title: 'Team', dataIndex: 'team', key: 'team' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
    { title: 'ADP', dataIndex: 'adp', key: 'adp' },
    { title: 'Trend', dataIndex: 'trend', key: 'trend' },
    { title: 'Rank', dataIndex: 'rank', key: 'rank' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ]

  const alert = alertCount > 0 &&
    <Alert
      message='Warning'
      description={`There are ${alertCount} issues with players that could affect value. Please see the team summaries.`}
      type='warning'
      showIcon
      closable
    />
  const progress = ProgressSelector(valueDiff);
  const statement = statementGenerator(valueDiff, team1Value, team2Value);
  return (
    <ContentComponent>
      <Helmet title="DynastyFFTools - Dynasty Trade Calculator" />
      <CalculatorWrapper>
        <CalculatorTeam>
          <h2>Team 1</h2>
          <Select
            multi
            onChange={changeTeam1}
            options={team1Options}
            placeholder="Add Players to Team 1"
            simpleValue
            value={team1}
          />
        </CalculatorTeam>
        <CalculatorTeam>
          <h2>Team 2</h2>
          <Select
            multi
            onChange={changeTeam2}
            options={team2Options}
            placeholder="Add Players to Team 2"
            simpleValue
            value={team2}
          />
        </CalculatorTeam>
      </CalculatorWrapper>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={!(team1.length && team2.length)}
          type="primary"
          size="large"
          onClick={evaluateTrade}
        >
          Calculate
        </Button>
      </div>
      <ResultsModel
        title="Results"
        visible={showResults}
        onOk={toggleResults}
        onCancel={toggleResults}
        width={800}
      >
      {alert}
      <Tabs activeKey={currentTab} onChange={tab => changeTab(String(tab))}>
        <ResultsTabPane tab={<span><Icon type="area-chart" />Summary</span>} key="1">
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Results Summay</h2>
            <Card title="Fairness" style={{ width: '100%' }}>
              <FairnessWrapper>
                {progress}
                <h3>{statement}</h3>
              </FairnessWrapper>
            </Card>
            <ReactHighcharts
              config={{
                chart: {
                  type: 'column'
                },
                title: {
                  text: 'Value Exchanged'
                },
                xAxis: {
                  categories: ['Team 1', 'Team 2']
                },

                yAxis: {
                  allowDecimals: false,
                  min: 0,
                  title: {
                    text: 'Value'
                  }
                },

                tooltip: {
                  formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                      this.series.name + ': ' + this.y + '<br/>' +
                      'Total: ' + this.point.stackTotal;
                  }
                },
                plotOptions: {
                  column: {
                    stacking: 'normal'
                  }
                },

                series: fullTeam1.map(x => ({
                  name: x.name,
                  data: [x.value, null]
                })).concat(fullTeam2.map(x => ({
                  name: x.name,
                  data: [null, x.value]
                })))
              }}
            />
          </div>
          <div>
            <ReactHighcharts
              config={{
                title: {
                  text: 'ADP'
                },
                subtitle: {
                  text: 'Past 3 months'
                },
                yAxis: {
                  title: {
                    text: 'ADP'
                  },
                  reversed: true,
                },
                xAxis: {
                  type: 'datetime',
                  dateTimeLabelFormats: { // don't display the dummy year
                    month: '%b %Y',
                    year: '%b'
                  },
                  title: {
                    text: 'Date'
                  }
                },
                tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.x:%b %Y}: {point.y:.2f}'
                },

                plotOptions: {
                  spline: {
                    marker: {
                      enabled: true
                    }
                  }
                },
                series: fullTeam1.map(x => ({
                  name: x.name,
                  data: x.adps.map(y => [new Date(y.date).getTime(), y.pick])
                })).concat(fullTeam2.map(x => ({
                  name: x.name,
                  data: x.adps.map(y => [new Date(y.date).getTime(), y.pick])
                }))),
                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                      }
                    }
                  }]
                }

              }}
            />
            <ReactHighcharts config={{
              chart: {
                type: 'columnrange',
                inverted: true
              },
              title: {
                text: 'Player Value Ranges'
              },

              xAxis: {
                categories: fullTeam1.concat(fullTeam2).sort((a, b) => a.adp -  b.adp).map(x => x.name)
              },
              yAxis: {
                title: {
                  text: 'Value'
                }
              },
              plotOptions: {
                columnrange: {
                  dataLabels: {
                    enabled: true,
                    format: 'Pick {y}'
                  }
                }
              },

              legend: {
                enabled: false
              },

              series: [{
                name: 'Temperatures',
                data: fullTeam1.concat(fullTeam2).sort((a, b) => a.adp -  b.adp).map(x => {
                  const range = generateRanges(x.picks);
                  return [range[range.length - 1][1], range[range.length - 1][2]]
                })
              }]

            }} />
          </div>
        </ResultsTabPane>
        <ResultsTabPane tab={<span><Icon type="usergroup-add" />Team 1 Gets</span>} key="2">
          <h2>Value Gained: {(team2Value - team1Value).toFixed(0)}</h2>
          <TeamTable
            columns={teamColumns}
            dataSource={fullTeam2.length > fullTeam1.length
              ? fullTeam2.concat([{
                name: 'Penalty',
                value: `-${(((fullTeam2.length - fullTeam1.length) * penalty) * 100).toFixed(0)}%`
              }])
              : fullTeam2
            }
            pagination={false}
            footer={() => <div style={{ display: 'flex', justifyContent: 'flex-end' }}><strong>Total: {team2Value.toFixed(0)}</strong></div>}
          />
        </ResultsTabPane>
        <ResultsTabPane tab={<span><Icon type="usergroup-add" />Team 2 Gets</span>} key="3">
          <h2>Value Gained: {(team1Value - team2Value).toFixed(0)}</h2>
          <TeamTable
            columns={teamColumns}
            dataSource={fullTeam1.length > fullTeam2.length
              ? fullTeam1.concat([{
                name: 'Penalty',
                value: `-${(((fullTeam1.length - fullTeam2.length) * penalty) * 100).toFixed(0)}%`
              }])
              : fullTeam1
            }
            pagination={false}
            footer={() => <div style={{ display: 'flex', justifyContent: 'flex-end' }}><strong>Total: {team1Value.toFixed(0)}</strong></div>}
          />
        </ResultsTabPane>
      </Tabs>
      </ResultsModel>
    </ContentComponent>
  )
}

TradeCalculator.propTypes = {
  players: PropTypes.array,
  loading: PropTypes.bool,
  team1: PropTypes.array,
  team2: PropTypes.array,
  team1Options: PropTypes.array,
  team2Options: PropTypes.array,
  changeTeam1: PropTypes.func,
  changeTeam2: PropTypes.func,
  showResults: PropTypes.bool,
  toggleResults: PropTypes.func,
  fullTeam1: PropTypes.array,
  fullTeam2: PropTypes.aray
}

export default TradeCalculator;
