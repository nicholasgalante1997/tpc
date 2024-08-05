import React, { memo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SolidAuthProvider, ProfileProvider } from './contexts';
import Router from './Router';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SolidAuthProvider>
        <ProfileProvider>
          <Router />
        </ProfileProvider>
      </SolidAuthProvider>
    </QueryClientProvider>
  );
}

export default memo(App);
