import { Session } from '@inrupt/solid-client-authn-browser';
import { useQuery } from '@tanstack/react-query';

import DataPodClient from '../models/DataPodClient';

async function fetchPodResourceList(session: Session) {
  return await new DataPodClient().getResource(session, ''); // Root path
}

export function useFetchPodResourceList(session: Session, isAuthenticated: boolean) {
  return useQuery({
    queryKey: ['pods', 'resource-list'],
    queryFn: () => fetchPodResourceList(session),
    enabled: isAuthenticated
  });
}
