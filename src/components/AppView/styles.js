import { Layout } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;

export const AppContent = styled(Content)`
margin: 24px 16px;
@media (max-width: 576px) {
  margin: 24px 5px;
}
`;
