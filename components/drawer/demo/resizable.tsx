import * as React from 'react';
import { Drawer, Segmented } from 'antd';
import type { DrawerProps } from 'antd';

type Placement = DrawerProps['placement'];

const Resizable = () => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<Placement>('right');
  const [size, setSize] = React.useState(256);

  const openDrawer = (direction: Placement) => {
    setPlacement(direction);
    setOpen(true);
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Segmented options={['left', 'top', 'right', 'bottom']} onChange={openDrawer} />
      </div>
      <Drawer
        size={size}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
        resizable={{
          onResize: (size) => {
            console.log(size);

            setSize(size);
          },
          onResizeStart: () => {
            console.log('onResizeStart');
          },
          onResizeEnd: () => {
            console.log('onResizeEnd');
          },
        }}
      >
        <div>Resizable Drawer</div>
      </Drawer>
    </div>
  );
};

export default Resizable;
