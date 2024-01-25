import { useQuery } from '@tanstack/react-query';

import { getNotificationsById } from '@/services/Notifications';
import { type Notifications } from '@/types/Notification';

export const useGetNotifications = (id: string) => {
	return useQuery<Notifications>({
		queryKey: ['user', id, 'notifications'],
		queryFn: () => getNotificationsById(id),
	});
};
