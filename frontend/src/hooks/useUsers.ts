import { useQuery } from '@tanstack/react-query';

import { getUserById, getUsersByUsername } from '@/services/Users';
import { type User, type Users } from '@/types/Users';

export const useGetUser = (id: string) => {
	return useQuery<User>({
		queryKey: ['user', id],
		queryFn: () => getUserById(id),
	});
};

export const useSearchUsers = (query: string) => {
	return useQuery<Users>({
		queryKey: ['users', query],
		queryFn: () => getUsersByUsername(query),
	});
};
