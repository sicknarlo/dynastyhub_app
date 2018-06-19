import React from 'react';
import ReactHighcharts from 'react-highcharts';
import { Link } from 'react-router-dom';
import { Row, Col, List, Tag } from 'antd';
import ContentComponent from '../ContentComponent';
import ScrollTable from '../ScrollTable';

export default ({
  players,
  topRisers,
  topFallers,
  bestValues,
  worstValues,
  top100Players,
  news,
  loadingNews,
}) => {
  return (
    <div>
      <h1>DynastyFFTools.com</h1>
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <ContentComponent>
            <ReactHighcharts config={{
              chart: {
                type: 'scatter',
                zoomType: 'xy'
              },
              title: {
                text: 'Top 100 ADP vs Value'
              },
              xAxis: {
                title: {
                  enabled: true,
                  text: 'ADP'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
              },
              yAxis: {
                title: {
                  text: 'Value'
                }
              },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                borderWidth: 1
              },
              plotOptions: {
                scatter: {
                  marker: {
                    radius: 3,
                    states: {
                      hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                      }
                    }
                  },
                  states: {
                    hover: {
                      marker: {
                        enabled: false
                      }
                    }
                  },
                  tooltip: {
                    pointFormat: '{point.x}, {point.y}'
                  }
                }
              },
              series: [{
                  name: 'ADP vs Value',
                  color: 'rgba(119, 152, 191, .5)',
                  data: top100Players.map(x => [x.adp, x.value ])
              }]
            }} />
          </ContentComponent>
        </Col>
        <Col xs={24} md={12}>
          <ContentComponent style={{ maxHeight: '445px', overflow: 'scroll' }}>
            <List
              header="Latest Dynasty News"
              loading={loadingNews}
              itemLayout="horizontal"
              dataSource={news}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href={item.link}>{item.title} <small>via {item.site}</small></a>}
                    description={(
                      <div>
                        <div>{item.body}</div>
                        <div>{item.players.map(x => <Link to={`/players/${x._id}`}><Tag>{x.name}</Tag></Link>)}</div>
                      </div>
                    )} />
                </List.Item>
              )}
            />
          </ContentComponent>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <ContentComponent>
          <h3>Risers</h3>
          <ScrollTable
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name', render: (name, player) => <Link to={`/players/${player._id}`}>{name}</Link> },
              { title: 'Position', dataIndex: 'position', key: 'position' },
              { title: 'ADP', dataIndex: 'adp', key: 'adp' },
              { title: 'Trend', dataIndex: 'trend', key: 'trend', render: value => `+${value}` },
            ]}
            dataSource={topRisers}
          />
          </ContentComponent>
        </Col>
        <Col xs={24} lg={12}>
          <ContentComponent>
            <h3>Fallers</h3>
            <ScrollTable
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name', render: (name, player) => <Link to={`/players/${player._id}`}>{name}</Link> },
                { title: 'Position', dataIndex: 'position', key: 'position' },
                { title: 'ADP', dataIndex: 'adp', key: 'adp' },
                { title: 'Trend', dataIndex: 'trend', key: 'trend' },
              ]}
              dataSource={topFallers}
            />
          </ContentComponent>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <ContentComponent>
          <h3>Best Values</h3>
          <ScrollTable
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name', render: (name, player) => <Link to={`/players/${player._id}`}>{name}</Link> },
              { title: 'Position', dataIndex: 'position', key: 'position' },
              { title: 'ADP', dataIndex: 'adp', key: 'adp' },
              { title: 'Rank', dataIndex: 'rank', key: 'rank' },
              { title: 'Opportunity', dataIndex: 'opportunity', key: 'opportunity' },
            ]}
            dataSource={bestValues}
          />
          </ContentComponent>
        </Col>
        <Col xs={24} lg={12}>
          <ContentComponent>
            <h3>Worst Values</h3>
            <ScrollTable
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name', render: (name, player) => <Link to={`/players/${player._id}`}>{name}</Link> },
                { title: 'Position', dataIndex: 'position', key: 'position' },
                { title: 'ADP', dataIndex: 'adp', key: 'adp' },
                { title: 'Rank', dataIndex: 'rank', key: 'rank' },
                { title: 'Opportunity', dataIndex: 'opportunity', key: 'opportunity' },
              ]}
              dataSource={worstValues}
            />
          </ContentComponent>
        </Col>
      </Row>
    </div>
  )
}
