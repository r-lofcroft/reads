import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  userId: string | null;
  accessToken: string | null;
  loggedIn: boolean;
  logIn: (userId: string, accessToken: string) => void;
  logOut: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const logIn = (userId: string, accessToken: string) => {
    setUserId(userId);
    setAccessToken(accessToken);
  };

  const logOut = () => {
    setUserId(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        accessToken,
        loggedIn: Boolean(accessToken),
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
