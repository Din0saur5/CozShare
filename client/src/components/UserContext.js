// UserContext.js
import { createContext, useContext } from 'react';

export const UserContext = createContext({
  userData: null,
    setUser: () => {} 
});

export const useUserContext = () => useContext(UserContext);

// AppLayout.jsx
