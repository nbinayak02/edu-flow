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

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: number | null;
}) => {
  const [userId, setUserId] = useState<number | null>(user);

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
