import React, { memo } from 'react';

import { SolidAuthProvider } from './contexts';
import Router from './Router';

function App() {
  return (
    <SolidAuthProvider>
      <Router />
    </SolidAuthProvider>
  );
}

export default memo(App);
