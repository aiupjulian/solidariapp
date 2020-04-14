import React, { createContext, useContext, useState } from "react";

const LoadingStateContext = createContext();
const LoadingSetContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingStateContext.Provider value={isLoading}>
      <LoadingSetContext.Provider value={setIsLoading}>
        {children}
      </LoadingSetContext.Provider>
    </LoadingStateContext.Provider>
  );
}

function useLoadingState() {
  const context = useContext(LoadingStateContext);
  if (context === undefined) {
    throw new Error("useLoadingState must be used within a LoadingProvider");
  }
  return context;
}

function useLoadingSet() {
  const context = useContext(LoadingSetContext);
  if (context === undefined) {
    throw new Error("useLoadingSet must be used within a LoadingProvider");
  }
  return context;
}

export { LoadingProvider, useLoadingState, useLoadingSet };
