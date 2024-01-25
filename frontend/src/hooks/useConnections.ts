import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
	deleteConnectionById,
	deletePendingConnection,
	getConnectionsById,
	getPendingConnectionsById,
} from '@/services/Connections';
import { type Connection, type Connections } from '@/types/Connection';

export const useGetConnections = (id: string) => {
	return useQuery<Connections>({
		queryKey: ['user', id, 'connections'],
		queryFn: () => getConnectionsById(id),
	});
};

export const useDeleteConnection = (
	sessionId: string | undefined,
	userId: string,
) => {
	if (!sessionId) throw new Error('Unauthenticated!');
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: string) => deleteConnectionById(userId),
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['user', sessionId, 'connections'],
			});
			const previousConnections = queryClient.getQueryData<Connections>([
				'user',
				sessionId,
				'connections',
			]);
			queryClient.setQueriesData(
				{ queryKey: ['user', sessionId, 'connections'] },
				previousConnections?.filter(
					(connection: Connection) => connection.id !== userId,
				),
			);
			return { previousConnections };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueriesData(
				{ queryKey: ['user', sessionId, 'connections'] },
				context?.previousConnections,
			);
		},
		onSettled: async () =>
			await queryClient.invalidateQueries({
				queryKey: ['user', sessionId, 'connections'],
			}),
	});
};

export const useGetPendingConnections = (id: string) => {
	return useQuery<Connections>({
		queryKey: ['user', id, 'connections', 'pending'],
		queryFn: () => getPendingConnectionsById(id),
	});
};

export const useDeletePendingConnection = (
	sessionId: string | undefined,
	userId: string,
) => {
	if (!sessionId) throw new Error('Unauthenticated!');
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: string) => deletePendingConnection(userId),
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: ['user', sessionId, 'connections', 'pending'],
			});
			const previousConnections = queryClient.getQueryData<Connections>([
				'user',
				sessionId,
				'connections',
				'pending',
			]);
			queryClient.setQueriesData(
				{ queryKey: ['user', sessionId, 'connections', 'pending'] },
				previousConnections?.filter(
					(connection) => connection.id !== userId,
				),
			);
			return { previousConnections };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueriesData(
				{ queryKey: ['user', sessionId, 'connections', 'pending'] },
				context?.previousConnections,
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['user', sessionId, 'connections', 'pending'],
			}),
	});
};
