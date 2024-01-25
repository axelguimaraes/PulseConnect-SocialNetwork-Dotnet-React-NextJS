import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/api';
import { type Connection, type Connections } from '@/types/Connection';

export const getConnectionsById = async (id: string): Promise<Connections> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.GET_CONNECTIONS_BY_ID(id)}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching connections: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Connections;
};

export const deleteConnectionById = async (id: string): Promise<Connection> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_CONNECTION_BY_ID(id)}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching connection: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Connection;
};

export const getPendingConnectionsById = async (
	_id: string,
): Promise<Connections> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		// `${
		// 	process.env.NEXT_PUBLIC_API_URL
		// }${API_ROUTES.CONNECTIONS.GET_PENDING_CONNECTIONS_BY_ID(id)}`,
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.CONNECTIONS.GET_CONNECTIONS}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching connections: ${response.status} ${response.statusText}`,
		);
	}

	if (response.status == 204) {
		return [];
	}

	return (await response.json()) as Connections;
};

export const deletePendingConnection = async (
	id: string,
): Promise<Connection> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}${API_ROUTES.CONNECTIONS.DELETE_PENDING_CONNECTION_BY_ID(id)}`,
		{
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${session.user.accessToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching connection: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Connection;
};
