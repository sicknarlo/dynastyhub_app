import React from 'react';
import { Timeline, Row, Col, Divider, Checkbox } from 'antd';
import Highcharts from 'highcharts';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { birthdateToAge, formatHeight } from '../../utils';
import ContentComponent from '../ContentComponent';
const ReactHighcharts = require('react-highcharts')
require('highcharts-more')(ReactHighcharts.Highcharts);

const CheckboxGroup = Checkbox.Group;

export default ({ players, player, timelineTypes, updateTimelineTypes }) => {
  if (!player) return null;
  if (player.position === 'PICK') {
    return (
      <div>
        <Helmet title={`DynastyFFTools - ${player.name}`} />
        <Row gutter={16}>
          <Col xs={24}>
            <ContentComponent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Timeline</h2>
                <CheckboxGroup
                  options={[
                    { label: 'News', value: 'news' },
                    { label: 'Trades', value: 'trade' },
                    { label: 'Picks', value: 'pick' },
                  ]}
                  value={timelineTypes}
                  onChange={updateTimelineTypes}
                />
              </div>
              <Timeline style={{ maxHeight: '500px', overflow: 'scroll', padding: '5px' }}>
                {player.events.filter(x => timelineTypes.includes(x.type)).map(x => x.item)}
              </Timeline>
            </ContentComponent>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <ContentComponent>
                <ReactHighcharts config={{
                  chart: {
                    type: 'spline'
                  },
                  title: {
                    text: `${player.name} - 6 Months`
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
                  yAxis: {
                    title: {
                      text: 'Pick'
                    },
                    max: Math.max.apply(null, player.adps.map(x => x.pick)) + 5,
                    reversed: true,
                  },
                  plotOptions: {
                    spline: {
                      marker: {
                        enabled: true
                      }
                    }
                  },
                  tooltip: {
                    crosshairs: true,
                    shared: true,
                  },
                  series: [
                    {
                      type: 'scatter',
                      name: `${player.name} Picks`,
                      data: player.picks.map(x => [new Date(x.date).getTime(), x.pick]),
                      marker: {
                        radius: 3,
                      },
                      tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x:%b %Y}: {point.y}'
                      },
                    },
                    {
                      type: 'spline',
                      name: `${player.name} ADP`,
                      data: player.adps.map(x => [new Date(x.date).getTime(), x.pick]),
                    },
                    {
                      name: 'Expected Range',
                      data: player.ranges,
                      type: 'arearange',
                      lineWidth: 0,
                      linkedTo: ':previous',
                      color: Highcharts.getOptions().colors[0],
                      fillOpacity: 0.3,
                      zIndex: 0,
                      marker: {
                        enabled: false
                      }
                  }
                ]
              }}
              />
            </ContentComponent>
          </Col>
        </Row>
      </div>
    )
  }
  return (
    <div>
      <Helmet title={`DynastyFFTools - ${player.name}`} />
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <ContentComponent>
            <h1 style={{ marginBottom: '10px' }}>{player.name}</h1>
            <h2>{player.team} | {player.position}</h2>
            <img
              src={`http://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${player.espnId}.png`}
              alt={`${player.name}`}
              style={{
                maxWidth: '350px',
                width: '100%',
                maxHeight: '254px',
                height: '100%',
                display: 'block',
                margin: 'auto'
              }}
            />
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <h2>ADP: {player.adps.length ? player.adps[player.adps.length - 1].pick : 'N/A'}</h2>
              <h2>ECR: {player.ranks.length ? player.ranks[player.ranks.length - 1].avg : 'N/A'}</h2>
              <h2>FFC ADP: {player.ffcAdps.length > 0 ? player.ffcAdps[player.ffcAdps.length - 1].avg : 'N/A'}</h2>
            </div>
            <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Age</strong></div>
              <div>{birthdateToAge(player.birthdate)}</div>
            </div>
            <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Experience</strong></div>
              <div>{moment().year() - player.draftYear } seasons</div>
            </div>
            <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Height</strong></div>
              <div>{formatHeight(player.height)}</div>
            </div>
            <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>Weight</strong></div>
              <div>{player.weight && `${player.weight}lbs`}</div>
            </div>
            <Divider style={{ marginBottom: '10px', marginTop: '10px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div><strong>College</strong></div>
              <div>{player.college}</div>
            </div>
          </ContentComponent>
        </Col>
        <Col xs={24} md={16}>
          <ContentComponent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Timeline</h2>
              <CheckboxGroup
                options={[
                  { label: 'News', value: 'news' },
                  { label: 'Trades', value: 'trade' },
                  { label: 'Picks', value: 'pick' },
                ]}
                value={timelineTypes}
                onChange={updateTimelineTypes}
              />
            </div>
            <Timeline style={{ maxHeight: '500px', overflow: 'scroll', padding: '5px' }}>
              {player.events.filter(x => timelineTypes.includes(x.type)).map(x => x.item)}
            </Timeline>
          </ContentComponent>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ContentComponent>
              <ReactHighcharts config={{
                chart: {
                  type: 'spline'
                },
                title: {
                  text: `${player.name} - 6 Months`
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
                yAxis: {
                  title: {
                    text: 'Pick'
                  },
                  reversed: true,
                  max: Math.max(...player.adps.map(x => x.pick))
                },
                plotOptions: {
                  spline: {
                    marker: {
                      enabled: true
                    }
                  }
                },
                tooltip: {
                  crosshairs: true,
                  shared: true,
                },
                series: [
                  {
                    type: 'scatter',
                    name: `${player.name} Picks`,
                    data: player.picks.map(x => [new Date(x.date).getTime(), x.pick]),
                    marker: {
                      radius: 3,
                    },
                    tooltip: {
                      headerFormat: '<b>{series.name}</b><br>',
                      pointFormat: '{point.x:%b %Y}: {point.y}'
                    },
                  },
                  {
                    type: 'spline',
                    name: `${player.name} ADP`,
                    data: player.adps.map(x => [new Date(x.date).getTime(), x.pick]),
                  },
                  {
                    name: 'Expected Range',
                    data: player.ranges,
                    type: 'arearange',
                    lineWidth: 0,
                    linkedTo: ':previous',
                    color: Highcharts.getOptions().colors[0],
                    fillOpacity: 0.3,
                    zIndex: 0,
                    marker: {
                      enabled: false
                    }
                },
                {
                  type: 'spline',
                  name: `${player.name} FFC ADP`,
                  data: player.ffcAdps.map(x => [new Date(x.date).getTime(), x.avg]),
                },
                {
                  name: 'FFC ADP Range',
                  data: player.ffcAdps.map(x => [new Date(x.date).getTime(), x.best, x.worst]),
                  type: 'arearange',
                  lineWidth: 0,
                  linkedTo: ':previous',
                  fillOpacity: 0.3,
                  zIndex: 0,
                  marker: {
                    enabled: false
                  }
              },
              {
                name: 'FFC ADP Stdev',
                data: player.ffcAdps.map(x => [new Date(x.date).getTime(), x.avg - x.stdev < 1 ? 1 : x.avg - x.stdev, x.avg + x.stdev]),
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                  enabled: false
                }
            },

              ]
            }}
            />
          </ContentComponent>
        </Col>
      </Row>
    </div>
  )
}
