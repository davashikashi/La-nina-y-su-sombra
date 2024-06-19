"use strict";

import socketIOClient from "socket.io-client";

const urlLocalServer = "http://localhost:8080";
const urlDeployServer = "https://la-ni-a-y-su-sombra-server.onrender.com";

/**
 * Socket connection
 */
export const socket = socketIOClient(urlDeployServer);