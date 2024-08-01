import React, { memo } from 'react';

import LayoutProps from './Layout.types';

function Layout({ children }: LayoutProps) {
    return (
        <>
            <aside></aside>
            <div id="content">
                {children}
            </div>
            {/* <div id="pink-tube"></div> */}
        </>
    );
}

export default memo(Layout);