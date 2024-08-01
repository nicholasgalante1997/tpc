import React, { memo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SolidAuthProvider } from './contexts';
import Router from './Router';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SolidAuthProvider>
        <Router />
      </SolidAuthProvider>
    </QueryClientProvider>
  );
}

export default memo(App);
