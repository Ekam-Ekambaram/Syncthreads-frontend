import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, username: null });

  const login = (token, username) => {
    setAuth({ token, username });
    localStorage.setItem('auth', JSON.stringify({ token, username }));
  };

  const logout = () => {
    setAuth({ token: null, username: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
