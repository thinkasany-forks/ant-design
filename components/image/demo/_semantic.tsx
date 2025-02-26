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
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        inset: 0,
      }}
    >
      <Image
        {...props}
        width={200}
        preview={{ getContainer: () => divRef.current }}
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
