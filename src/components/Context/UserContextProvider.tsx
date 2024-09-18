import React, { ReactNode, createContext, useState } from "react";

// type definition for the user
type UserType = {
  name: string;
  email: string;
  isAuth: boolean;
};

// type definition for UserContext
type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

// type definition for UserContextProviderProps
type UserContextProviderProps = {
  children: ReactNode;
};

// creating a context
const UserContext = createContext<UserContextType | null>({
  user: {
    name: "",
    email: "",
    isAuth: false,
  },
  setUser: () => {},
});

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    isAuth: false,
  });
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export { UserContextProvider, UserContext };
