import { Session } from '@inrupt/solid-client-authn-browser';

export interface ISolidAuthContext {
  session: Session;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  login: () => Promise<void>;
}

export interface SolidAuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
