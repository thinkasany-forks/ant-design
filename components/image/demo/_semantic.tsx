import React from 'react';
import { Image } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    icon: '图标元素',
  },
  en: {
    icon: 'Icon element',
  },
};

const Block = (props: any) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Image
        {...props}
        width={200}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview semantics={[{ name: 'icon', desc: locale.icon, version: '5.5.0' }]}>
      <Block />
    </SemanticPreview>
  );
};

export default App;
