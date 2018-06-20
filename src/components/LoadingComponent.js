import React from 'react';
import { Spin } from 'antd';
import generateRandomLoadingMessage from '../utils/generateRandomLoadingMessage';

export default ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <Spin size='large' tip={generateRandomLoadingMessage()}/>
          </div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};
