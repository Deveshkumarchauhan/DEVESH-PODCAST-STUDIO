import {io} from 'socket.io-client'; const localSocket=`${location.protocol}//${location.hostname}:9090`; export const socket=io(import.meta.env.VITE_SOCKET_URL||localSocket,{autoConnect:false});
