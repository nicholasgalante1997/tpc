import { useSolidAuthContext } from '@/contexts';
import { useFetchPodResourceList } from '@/hooks/useFetchPodFileList';
import React, { memo } from 'react';

function Home() {
  const { isAuthenticated, session } = useSolidAuthContext();
  useFetchPodResourceList(session, isAuthenticated);
  return (
    <div>
      <h1 className="space-mono-bold">Nick's Pod</h1>
    </div>
  );
}

export default memo(Home);
