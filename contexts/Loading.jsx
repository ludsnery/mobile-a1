import React, {  createContext, useCallback, useContext, useState } from "react";
import Spinner from 'react-native-loading-spinner-overlay'


const LoadingContext = createContext({});

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({loading:false, message:''});

  const startLoading = useCallback((message) => {
    

    setLoading({loading:true, message});
  }, []);

  const endLoading = useCallback(() => {
    setLoading({loading:false,message:''});
  }, []);

  return (
    <LoadingContext.Provider value={{ startLoading, endLoading }}>
      {children}
      <Spinner visible={loading.loading} textContent={loading.message} />
    </LoadingContext.Provider>
  );
};

const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used within a LoadingProvider");
  return context;
};

export { LoadingProvider, useLoading };
