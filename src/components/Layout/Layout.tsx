import React, { memo, useState } from 'react';

import LayoutProps from './Layout.types';
import Icon from '../Icon/Icon';
import { useGsap } from '@/hooks/useGsap';

function Layout({ children }: LayoutProps) {
  const [asideOpen, setAsideOpen] = useState(false);

  useGsap([
    {
      method: 'fromTo',
      target: '.what-is-a-pod',
      from: { opacity: 0 },
      to: { duration: '300ms', opacity: 1 },
      enabled: asideOpen
    }
  ]);


  return (
    <>
      <aside data-visibility={asideOpen ? 'open' : 'closed'}>
        {asideOpen ? (
          <ul>
            <li className="space-mono-bold-italic what-is-a-pod">
              <a>What is a pod?</a>
            </li>

            <li className="space-mono-bold-italic">
              <a>Gotta Catch 'Em All!</a>
            </li>
          </ul>
        ) : (
          false
        )}
      </aside>
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
