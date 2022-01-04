import React from 'react';
import * as socketio from "socket.io-client";


export const socket = socketio.connect(process.env.REACT_APP_API_SOCKET);
export const SocketContext = React.createContext();