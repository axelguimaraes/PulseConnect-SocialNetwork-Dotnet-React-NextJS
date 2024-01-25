import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/api';
import { type User, type Users } from '@/types/Users';

export const getUserById = async (id: string): Promise<User> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USERS.GET_USER_BY_ID(
			id,
		)}`,
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
			`Error fetching user: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as User;
};

export const getUsersByUsername = async (query: string): Promise<Users> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USERS.GET_USERS}?query=${query}`,
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
			`Error fetching users: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Users;
};
