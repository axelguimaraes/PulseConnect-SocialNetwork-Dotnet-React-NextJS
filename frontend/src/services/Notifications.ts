import { getSession } from 'next-auth/react';

import { API_ROUTES } from '@/routes/api';
import { type Notifications } from '@/types/Notification';

export const getNotificationsById = async (
	id: string,
): Promise<Notifications> => {
	const session = await getSession();

	if (!session) throw new Error('Unauthenticated!');

	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL_2
		}${API_ROUTES.NOTIFICATIONS.GET_NOTIFICATIONS_BY_ID(id)}`,
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
			`Error fetching notifications: ${response.status} ${response.statusText}`,
		);
	}

	return (await response.json()) as Notifications;
};
