import { createContext, useState } from "react";

export const AuthContext = createContext();

const UserMagnger = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser,  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserMagnger;