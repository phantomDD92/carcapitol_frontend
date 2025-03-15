// contexts/UserContext.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage, { ACCESS_TOKEN_KEY } from '@/hooks/useLocalStorage';

type UserType = {
  email: string;
  firstName: string;
  lastName: string;
};

type UserContextDataType = {
  accessToken: string;
  refreshToken: string;
  user: UserType;
};

interface UserContextType {
  data: UserContextDataType;
  setData: (data: UserContextDataType) => void;
  handleGetUserDataFromToken: (token?: string) => void;
  handleSetData: (path: string, value: string | number) => void;
}

const initialData: UserContextDataType = {
  accessToken: '',
  refreshToken: '',
  user: {} as UserType,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useLocalStorage<string>(
    ACCESS_TOKEN_KEY,
    '',
  );
  const [data, setData] = useState<UserContextDataType>({
    ...initialData,
    accessToken: accessToken,
  } as UserContextDataType);

  const handleSetData = (path: string, value: string | number) => {
    const keys = path.split('.');
    setData((prevData) => {
      const newData = { ...prevData };
      let current: any = newData;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });
      return newData;
    });
  };

  const handleGetUserDataFromToken = async (token?: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/auth/get-user-data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || data.accessToken || ''}`,
          },
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      setData((prev) => ({
        ...prev,
        user: result.data.user,
        accessToken: result.data.tokens.accessToken,
        refreshToken: result.data.tokens.refreshToken,
      }));
      setAccessToken(result.data.tokens.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetUserDataFromToken().then(() => {});
  }, [handleGetUserDataFromToken]);

  return (
    <UserContext.Provider
      value={{ data, setData, handleGetUserDataFromToken, handleSetData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
