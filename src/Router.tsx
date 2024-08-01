import React, { memo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import { useSolidAuthContext } from './contexts';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
          <Layout>
            {/* <Home /> */}
            <App />
          </Layout>
        )
    }
]);


function App() {
  const { session, isAuthenticated, login, logout } = useSolidAuthContext();
  const [files, setFiles] = useState<string[]>([]);

  const fetchFiles = async () => {
    if (!isAuthenticated) return;
    try {
      const podUrl = process.env.SOLID_POD_URL;
      const folderUrl = `${podUrl}favicon.ico`; // Adjust the path to the folder you want to list
      const response = await fetch(folderUrl, {
        headers: {
          Authorization: `Bearer ${session.info.webId}`,
        },
      });
      const data = await response.text();
      // Assuming the response is a list of files, process it accordingly
      setFiles(data.split('\n').filter((file) => file));
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div>
      <h1>Solid File List App</h1>
      {isAuthenticated ? (
        <>
          <button onClick={logout}>Logout</button>
          <button onClick={fetchFiles}>Fetch Files</button>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={login}>Login</button> // Adjust the OIDC issuer if needed
      )}
    </div>
  );
};


function Router() {
    return <RouterProvider router={router} />
}

export default memo(Router);