import React from 'react';
import { Alert } from 'antd';

const App: React.FC = () => (
  <>
    <Alert title="Success Tips" type="success" showIcon />
    <br />
    <Alert title="Informational Notes" type="info" showIcon />
    <br />
    <Alert title="Warning" type="warning" showIcon closable />
    <br />
    <Alert title="Error" type="error" showIcon />
    <br />
    <Alert
      title="Success Tips"
      content="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <br />
    <Alert
      title="Informational Notes"
      content="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <br />
    <Alert
      title="Warning"
      content="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    />
    <br />
    <Alert
      title="Error"
      content="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </>
);

export default App;
