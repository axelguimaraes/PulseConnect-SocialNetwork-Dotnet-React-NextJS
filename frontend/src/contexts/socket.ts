import { createContext } from 'react';
import socketio from 'socket.io-client';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { env } from '@/env.mjs';

const session = await getServerAuthSession();

export const socket = socketio(env.SOCKET_URL, {
	auth: {
		token: session?.user.accessToken,
	},
});
export const SocketContext = createContext(socket);
