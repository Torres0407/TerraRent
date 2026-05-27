// import { createContext, useContext, useEffect, useState } from 'react';
// import { authService } from '../services/auth/functions';

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(authService.getCurrentUser());
//   const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

//   useEffect(() => {
//     const syncAuth = () => {
//       setUser(authService.getCurrentUser());
//       setIsAuthenticated(authService.isAuthenticated());
//     };

//     window.addEventListener('storage', syncAuth);
//     return () => window.removeEventListener('storage', syncAuth);
//   }, []);

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/auth/functions';

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      const authenticated = authService.isAuthenticated();

      setUser(currentUser);
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    initAuth();

    window.addEventListener('storage', initAuth);
    return () => window.removeEventListener('storage', initAuth);
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
