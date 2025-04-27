import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert
      title="Success Text"
      content="Success Description Success Description Success Description"
      type="success"
    />
    <br />
    <Alert
      title="Info Text"
      content="Info Description Info Description Info Description Info Description"
      type="info"
    />
    <br />
    <Alert
      title="Warning Text"
      content="Warning Description Warning Description Warning Description Warning Description"
      type="warning"
    />
    <br />
    <Alert
      title="Error Text"
      content="Error Description Error Description Error Description Error Description"
      type="error"
    />
  </>
);

export default App;
