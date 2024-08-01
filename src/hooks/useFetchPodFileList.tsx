import { Session } from '@inrupt/solid-client-authn-browser';
import { useQuery } from '@tanstack/react-query';

async function fetchPodResourceList(session: Session) {
    try {
        const podUrl = process.env.SOLID_POD_URL;
        // const folderUrl = `${podUrl}favicon.ico`; // Adjust the path to the folder you want to list
        const response = await fetch(podUrl!, {
          headers: {
            Authorization: `Bearer ${session.info.webId}`
          }
        });
        const data = await response.text();
        // Assuming the response is a list of files, process it accordingly
        console.log({ podData: data });
        return data;
      } catch (error) {
        console.error('Error fetching files:', error);
      }
}

export function useFetchPodResourceList(session: Session, isAuthenticated: boolean) {
    return useQuery({
        queryKey: ['pods', 'resource-list'],
        queryFn: () => fetchPodResourceList(session),
        enabled: isAuthenticated
    })
}