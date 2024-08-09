import React, { memo, useState } from 'react';

import LayoutProps from './Layout.types';
import Icon from '../Icon/Icon';

function Layout({ children }: LayoutProps) {
  const [asideOpen, setAsideOpen] = useState(false);
  return (
    <>
      <aside data-visibility={asideOpen ? 'open' : 'closed'}></aside>
      <div id="content">{children}</div>
      <Icon
        onClick={() => setAsideOpen(!asideOpen)}
        id="drawer-icon"
        data-dir={asideOpen ? 'left' : 'right'}
        name={asideOpen ? 'left-arrow' : 'right-arrow'}
        height="44px"
        width="44px"
      />
    </>
  );
}

export default memo(Layout);
