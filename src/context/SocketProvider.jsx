import React, { createContext, useMemo } from "react";
import { useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() =>
  io("https://peermeet-backend.onrender.com"), //   , io("https://peermeet-backend.onrender.com/")

   []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
