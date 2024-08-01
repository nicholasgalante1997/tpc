import { useSolidAuthContext } from '@/contexts';
import { useFetchPodResourceList } from '@/hooks/useFetchPodFileList';
import React, { memo } from 'react';

function Home() {
  const { isAuthenticated, session } = useSolidAuthContext();
  const { data } = useFetchPodResourceList(session, isAuthenticated);
  console.log('rootPodResourceList', data);
  return (
    <div>
      <h1 className="space-mono-bold">Nick's Pod</h1>
    </div>
  );
}

export default memo(Home);
