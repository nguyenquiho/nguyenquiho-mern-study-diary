import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    // useReducer nhận vào 2 tham số(1 reducer và 1 giá trị khởi tạo)
    // tương tự như useState, useReducer trả về 1 array[tên State, 1 dispatch]
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user
  // const loadUser = async () => {
  //   if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
  //     setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
  //   }

  //   try {
  //     const response = await axios.get(`${apiUrl}/auth`);
  //     if (response.data.success) {
  //       dispatch({
  //         type: "SET_AUTH",
  //         payload: { isAuthenticated: true, user: response.data.user },
  //       });
  //     }
  //   } catch (error) {
  //     localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  //     setAuthToken(null);
  //     dispatch({
  //       type: "SET_AUTH",
  //       payload: { isAuthenticated: false, user: null },
  //     });
  //   }
  // };

  useEffect(() => {
    // declare the data fetching function
    const loadUser = async () => {
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      }
  
      try {
        const response = await axios.get(`${apiUrl}/auth`);
        console.log(response)
        if (response.data.success) {
          dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: true, user: response.data.user },
          });
        }
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: false, user: null },
        });
      }
    }
  
    // call the function
    loadUser()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  // Login
  const loginUser = async (userForm) => {
    console.log(apiUrl);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Context data
  const authContextData = { loginUser, authState };

  // Return Provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
