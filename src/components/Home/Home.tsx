import React, { memo } from 'react';

function Home() {
  return (
    <div id="home-page-root">
      <h1 className="text_shadows">Nick's Pod</h1>
    </div>
  );
}

export default memo(Home);
