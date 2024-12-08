"use client";
import { User } from "@/infrastructure/interfaces/entities";
import React, { createContext, useState, useContext } from "react";

type ProfileContextProps = {
	children: React.ReactNode
}

type ProfileContextType = {
    user: Partial<User> | null,
    setProfile: (user: Partial<User>) => void
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileContextProvider = ({ children }: ProfileContextProps) => {
    const [user, setUser] = useState<Partial<User> | null>(null);
    
    const setProfile = (user: Partial<User>) => {
        setUser(user);
    }
    return (
      <ProfileContext.Provider
        value={{user, setProfile}}
      >
        {children}
      </ProfileContext.Provider>
    );
  };
  
  export const useProfileContext = () => useContext(ProfileContext) as ProfileContextType;