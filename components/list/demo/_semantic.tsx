import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Switch, Typography } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    extra: '额外内容',
    actions: '列表操作组',
    header: '头部元素',
    footer: '底部元素',
  },
  en: {
    root: 'Root Element',
    extra: 'Extra Element',
    actions: 'Actions Element',
    header: 'Header Element',
    footer: 'Footer Element',
  },
};

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const data = Array.from({ length: 1 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const BlockList: React.FC<React.PropsWithChildren> = (props) => {
  const [simple, setSimple] = React.useState(false);
  const onChange = (checked: boolean) => setSimple(checked);
  return (
    <div style={{ position: 'absolute', inset: 0, height: 420, margin: 20 }}>
      Simple <Switch onChange={onChange} />
      {simple ? (
        <List
          {...props}
          style={{ marginTop: 20 }}
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={[
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
          ]}
          renderItem={(item) => (
            <List.Item {...props}>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      ) : (
        <List
          {...props}
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              {...props}
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      height={420}
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'extra', desc: locale.extra, version: '5.18.0' },
        { name: 'actions', desc: locale.actions, version: '5.18.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'footer', desc: locale.footer, version: '6.0.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
