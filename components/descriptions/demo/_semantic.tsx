import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    label: '标签',
    content: '内容',
  },
  en: {
    label: 'label',
    content: 'content',
  },
};

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Telephone',
    children: '1810000000',
  },
];

const BlockList: React.FC<React.PropsWithChildren> = (props: any) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute', height: 100 }}>
      <Descriptions title="User Info" items={items} {...props} />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.label, version: '5.23.0' },
        { name: 'indicator', desc: locale.content, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
