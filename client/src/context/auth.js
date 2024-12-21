import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";



//Note: at the time of login, we set auth to true






const AuthContext = createContext();
 /* It provides a way to share authentication-related data (like user and token)
  across the application without passing props manually through every component. */



//now by this AuthProvider, the auth varaible can be accesed globally( functionality by react)
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({user: null,token: "",}); // initial state

  
  
  
  //will explain later   VERY IMP make sure that every req is authenticated...
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }// Without dependency array the useeffect will run only when page is loaded!! so login is still there when page is reloaded
    //eslint-disable-next-line
  }, []); 



  return (
    <AuthContext.Provider value={[auth, setAuth]}>   {/* inbuilt in context api  */}
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
