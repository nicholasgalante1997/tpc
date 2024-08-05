import React, { memo } from 'react';
import data from './data.json';
import { ProfileContext } from './Context';

type ProfileProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

function ProfileProvider({ children }: ProfileProviderProps) {
  return <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>;
}

export default memo(ProfileProvider);
