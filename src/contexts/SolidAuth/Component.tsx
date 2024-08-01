import React, { useState, useEffect, memo } from 'react';
import { Session } from '@inrupt/solid-client-authn-browser';

import { SolidAuthContext } from './Context';
import { SolidAuthProviderProps } from './types';

function SolidAuthProvider({ children }: SolidAuthProviderProps) {
  const [session, setSession] = useState(() => new Session());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    await session.login({
      oidcIssuer: process.env.SOLID_POD_OIDC_ISSUER,
      redirectUrl: process.env.SOLID_AUTH_REDIRECT_URI,
      clientName: process.env.SOLID_APP_CLIENT_NAME,
    });
  };

  const logout = async () => {
    await session.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    /**
     * On initial render,
     * if we are not authenticated,
     * Attempt to authenticate.
     */
    const authParam = new window.URLSearchParams(window.location.search).get('datapod_auth');
      if (!isAuthenticated && !authParam) {
        login();
      }
  }, [])

  useEffect(() => {
    session.handleIncomingRedirect({ restorePreviousSession: true })
      .then(() => {
        setIsAuthenticated(session.info.isLoggedIn);
      });
  }, [session]);

  return (
    <SolidAuthContext.Provider value={{ session, isAuthenticated, login, logout }}>
      {children}
    </SolidAuthContext.Provider>
  );
};

export default memo(SolidAuthProvider);