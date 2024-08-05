import React, { memo } from 'react';

import LayoutProps from './Layout.types';
import Icon from '../Icon/Icon';

function Layout({ children }: LayoutProps) {
  return (
    <>
      <aside>
        <Icon name="js" />
      </aside>
      <div id="content">{children}</div>
      {/* <div id="pink-tube"></div> */}
    </>
  );
}

export default memo(Layout);
