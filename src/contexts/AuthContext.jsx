import { useState, useEffect, createContext, useContext } from "react";
import EncryptedStorage from 'react-native-encrypted-storage';

const AuthContext = createContext();

const ACCESS_TOKEN_STORAGE_NAME = "access_token";

function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ accessToken: undefined });

  // Get current access token from EncryptedStorage
  const getAccessToken = async () => {
    try {
      const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_STORAGE_NAME);
      setAuthState({ ...authState, accessToken: accessToken });
    } catch (err) {
    }
  };

  // set access token to EncryptedStorage
  const setAccessToken = async (accessToken) => {
    try {
      await EncryptedStorage.setItem(ACCESS_TOKEN_STORAGE_NAME, accessToken);
      setAuthState({ ...authState, accessToken: accessToken });
    } catch (error) {
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
