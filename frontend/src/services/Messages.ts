import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/api';
import { type Messages } from '@/types/Messages';

export const getMessagesById = async (id: string): Promise<Messages> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL_2
		}${API_ROUTES.MESSAGES.GET_MESSAGES}`,
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
			`Error fetching messages: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Messages;
};
