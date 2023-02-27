import { createContext, useState } from "react";

export const AlertContex = createContext();

const NotificationCTX = ({ children }) => {
  const [data, setData] = useState({
    open: false,
    message: "",
    success: null
  });
  const toggleOn = (message, success) => {
    setData({
      open: true,
      message,
      success
    });
  };
  const toggleOff = (reason) => {
    setData({
      open: false,
      message: "",
      success: null
    });
  };
  return (
    <AlertContex.Provider
      value={{
        open: data.open,
        message: data.message,
        success: data.success,
        toggleOff,
        toggleOn
      }}
    >
      {children}
    </AlertContex.Provider>
  );
};

export default NotificationCTX;
