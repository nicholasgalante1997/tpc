import React, { memo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ProfileProvider } from './contexts';
import Router from './Router';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <Router />
      </ProfileProvider>
    </QueryClientProvider>
  );
}

export default memo(App);
