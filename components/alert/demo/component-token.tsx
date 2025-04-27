import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Alert, ConfigProvider } from 'antd';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Alert: {
          withDescriptionIconSize: 32,
          withDescriptionPadding: 16,
        },
      },
    }}
  >
    <Alert
      icon={icon}
      title="Success Tips"
      content="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
  </ConfigProvider>
);

export default App;
