import React, {createContext, useContext, useState} from 'react';

const JoinModalStateContext = createContext();
const JoinModalSetContext = createContext();

function JoinModalProvider({children}) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  return (
    <JoinModalStateContext.Provider value={showJoinModal}>
      <JoinModalSetContext.Provider value={setShowJoinModal}>
        {children}
      </JoinModalSetContext.Provider>
    </JoinModalStateContext.Provider>
  );
}

function useJoinModalState() {
  const context = useContext(JoinModalStateContext);
  if (context === undefined) {
    throw new Error(
      'useJoinModalState must be used within a JoinModalProvider',
    );
  }
  return context;
}

function useJoinModalSet() {
  const context = useContext(JoinModalSetContext);
  if (context === undefined) {
    throw new Error('useJoinModalSet must be used within a JoinModalProvider');
  }
  return context;
}

export {JoinModalProvider, useJoinModalState, useJoinModalSet};
