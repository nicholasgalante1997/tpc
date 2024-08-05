import { createContext, useContext } from 'react';
import data from './data.json';

export const ProfileContext = createContext<typeof data>(data);
export const useProfileContext = () => useContext(ProfileContext);
