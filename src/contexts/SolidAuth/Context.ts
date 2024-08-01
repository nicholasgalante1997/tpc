import { createContext, useContext } from 'react';

import { ISolidAuthContext } from './types';
import { Session } from '@inrupt/solid-client-authn-browser';

const defaultContext: ISolidAuthContext = {
  isAuthenticated: false,
  session: new Session(),
  async login() {},
  async logout() {}
};

export const SolidAuthContext = createContext<ISolidAuthContext>(defaultContext);

export const useSolidAuthContext = () => useContext(SolidAuthContext);
