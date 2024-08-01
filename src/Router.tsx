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
        <Home />
      </Layout>
    )
  }
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default memo(Router);
