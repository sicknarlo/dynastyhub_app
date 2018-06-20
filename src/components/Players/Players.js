import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Checkbox, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PlayerToolBar, PlayerTable } from './styles';
import ContentComponent from '../ContentComponent';
import birthdateToAge from '../../utils/birthdateToAge';

const playerTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (value, player) => <Link to={`/players/${player._id}`}>{player.name}</Link>
  }, {
    title: 'Age',
    dataIndex: 'birthdate',
    render: value => birthdateToAge(value),
    key: 'age',
  }, {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'ADP',
    dataIndex: 'adp',
    sorter: true,
    render: value => value.toFixed(2)
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    render: value => value || 'N/R',
    sorter: true
  },
  {
    title: 'Opportunity',
    dataIndex: 'opportunity',
    render: value => value || 'N/R',
    sorter: true
  },
  {
    title: '3 Mo. Trend',
    dataIndex: 'trend',
    render: value => value > 0
      ? (<span><Icon type='caret-up' style={{ color: '#00a854' }}/> {value}</span>)
      : value < 0
        ? (<span><Icon type='caret-down' style={{ color: '#f04134' }} /> {value}</span>)
        : value
  },
  {

    title: 'Value',
    dataIndex: 'value',
  },
]

const Players = ({
  players,
  loading,
  handleTableChange,
  searchValue,
  handleSearchChange,
  positionOptions,
  positions,
  handlePositionFilterChange
}) => {
  return (
    <ContentComponent>
      <Helmet title="DynastyFFTools - ADP" />
      <PlayerToolBar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Form.Item label="Search Players">
          <Input value={searchValue} onChange={handleSearchChange} />
        </Form.Item>
        <Form.Item label="Positions">
          <Checkbox.Group options={positionOptions} value={positions} onChange={handlePositionFilterChange} />
        </Form.Item>
      </PlayerToolBar>
      <PlayerTable
        dataSource={players}
        columns={playerTableColumns}
        size="middle"
        loading={loading}
        rowKey={x => x._id}
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100', '200'],
        }}
      />
    </ContentComponent>
  )
}

Players.propTypes = {
  players: PropTypes.array,
  loading: PropTypes.bool,
  handleTableChange: PropTypes.func,
  searchValue: PropTypes.string,
  handleSearchChange: PropTypes.func
}

export default Players;
