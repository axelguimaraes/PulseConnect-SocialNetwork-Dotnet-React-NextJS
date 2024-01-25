import { useQuery } from '@tanstack/react-query';

import { getMessagesById } from '@/services/Messages';
import { type Messages } from '@/types/Messages';

export const useGetMessages = (id: string) => {
	return useQuery<Messages>({
		queryKey: ['user', id, 'messages'],
		queryFn: () => getMessagesById(id),
	});
};
