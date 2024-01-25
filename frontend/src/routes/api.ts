export const API_ROUTES = {
	AUTH: {
		LOGIN: '/account/login',
		REGISTER: '/account/register',
	},
	USERS: {
		GET_USERS: '/users',
		GET_USER_BY_ID: (id: string) => `/users/${id}`,
		GET_USER_MESSAGES_BY_ID: (id: string) => `/users/${id}/messages`,
		GET_USER_MESSAGE_BY_ID: (id: string, messageId: string) =>
			`/users/${id}/messages/${messageId}`,
	},
	CONNECTIONS: {
		GET_CONNECTIONS: '/connections/all', // Testing
		GET_CONNECTIONS_BY_ID: (id: string) => `/connections/${id}`,
		CREATE_CONNECTION_BY_ID: (id: string) => `/connections/${id}`,
		DELETE_CONNECTION_BY_ID: (id: string) => `/connections/${id}`,
		GET_PENDING_CONNECTIONS_BY_ID: (id: string) =>
			`/connections/${id}/pending`,
		DELETE_PENDING_CONNECTION_BY_ID: (id: string) =>
			`/connections/${id}/pending`,
	},
	NOTIFICATIONS: {
		GET_NOTIFICATIONS: '/notifications', // Testing
		GET_NOTIFICATIONS_BY_ID: (id: string) => `/notifications/${id}`,
		DELETE_NOTIFICATIONS_BY_ID: (id: string) => `/notifications/${id}`,
		GET_NOTIFICATIONS_TOTAL_BY_ID: (id: string) =>
			`/notifications/${id}/total`,
	},
	MESSAGES: {
		GET_MESSAGES: '/messages', // Testing
		GET_MESSAGES_BY_ID: (id: string) =>
			`/messages/getconversations?SenderID=${id}`,
		GET_MESSAGES_BY_ID_AND_CONNECTION_ID: (
			id: string,
			connectionId: string,
		) => `/messages/${id}/${connectionId}`,
		DELETE_MESSAGES_BY_ID_AND_CONNECTION_ID: (
			id: string,
			connectionId: string,
		) => `/messages/${id}/${connectionId}`,
	},
};
