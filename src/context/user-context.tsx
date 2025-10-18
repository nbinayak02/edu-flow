"use client";
import { createContext, useContext, useState } from "react";

interface ContextType {
  setUserContext: (data: number) => void;
  userId: number | null;
}

const UserContext = createContext<ContextType>({
  setUserContext(data) {},
  userId: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  const setUserContext = (userId: number) => {
    setUserId(userId);
  };

  return (
    <UserContext.Provider value={{ setUserContext, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
