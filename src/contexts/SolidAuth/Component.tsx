import React, { useState, useEffect, memo } from 'react';
import { Session } from '@inrupt/solid-client-authn-browser';

import { SolidAuthContext } from './Context';
import { SolidAuthProviderProps } from './types';

function SolidAuthProvider({ children }: SolidAuthProviderProps) {
  const [session, setSession] = useState(() => new Session());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async () => {
    console.log({
      oidcIssuer: process.env.SOLID_POD_OIDC_ISSUER,
      redirectUrl: process.env.SOLID_AUTH_REDIRECT_URI,
      clientName: process.env.SOLID_APP_CLIENT_NAME
    })
    await session.login({
      oidcIssuer: process.env.SOLID_POD_OIDC_ISSUER,
      redirectUrl: process.env.SOLID_AUTH_REDIRECT_URI,
      clientName: process.env.SOLID_APP_CLIENT_NAME
    });
  };

  const logout = async () => {
    await session.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    /**
     * TODO
     * This connection is extremely important
     * Ensure we have logged in OR redirect on failure
     */
    const authParam = new window.URLSearchParams(window.location.search).get('datapod_auth');
    if (!isAuthenticated && !authParam) {
      login();
    }
  }, []);

  useEffect(() => {
    session.handleIncomingRedirect({ restorePreviousSession: true }).then(() => {
      setIsAuthenticated(session.info.isLoggedIn);
    });
  }, [session]);

  return (
    <SolidAuthContext.Provider value={{ session, isAuthenticated, login, logout }}>
      {children}
    </SolidAuthContext.Provider>
  );
}

export default memo(SolidAuthProvider);
