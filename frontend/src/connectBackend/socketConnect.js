import React from 'react';
import * as socketio from "socket.io-client";


export const socket = socketio.connect('http://localhost:8000');
export const SocketContext = React.createContext();