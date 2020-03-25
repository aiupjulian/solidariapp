import React, { createContext, useContext, useReducer } from "react";
import * as firebase from "firebase";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOADING": {
      return { isLoading: true };
    }
    case "SIGNED_IN": {
      return {
        isLoading: false,
        displayName: action.displayName,
        photoURL: action.photoURL
      };
    }
    case "SIGNED_OUT": {
      return { isLoading: false };
    }
    case "ERROR": {
      return { isLoading: false, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, { isLoading: true });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

async function signIn(dispatch) {
  dispatch({ type: "LOADING" });
  try {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  } catch (error) {
    dispatch({ type: "ERROR", error });
  }
}

async function signOut(dispatch) {
  dispatch({ type: "LOADING" });
  try {
    await firebase.auth().signOut();
  } catch (error) {
    dispatch({ type: "ERROR", error });
  }
}

function userStateObserver(dispatch, user) {
  if (user) {
    dispatch({
      type: "SIGNED_IN",
      displayName: user.displayName,
      photoURL: user.photoURL
    });
  } else {
    dispatch({ type: "SIGNED_OUT" });
  }
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  signIn,
  signOut,
  userStateObserver
};
