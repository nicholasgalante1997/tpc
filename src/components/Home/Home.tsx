import { useSolidAuthContext } from '@/contexts';
import { useFetchPodResourceList } from '@/hooks/useFetchPodFileList';
import React, { memo } from 'react';

function Home() {
  const { isAuthenticated, session } = useSolidAuthContext();
  const { data } = useFetchPodResourceList(session, isAuthenticated);
  console.log('rootPodResourceList', data);
  return (
    <div id="home-page-root">
      <h1 className="space-mono-bold">nick&apos;s pod</h1>
      <small>
        Welcome to my pod!
      </small>
    </div>
  );
}

export default memo(Home);
