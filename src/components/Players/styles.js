import styled from 'styled-components';
import { Table } from 'antd';

export const PlayerToolBar = styled.div`
display: flex;
justifyContent: 'space-between';
@media (max-width: 576px) {
  flex-direction: column;
}
`

export const PlayerTable = styled(Table)`
.ant-table-body {
  overflow: scroll;
}
td {
  white-space: nowrap;
}
th {
  white-space: nowrap;
}
`;
