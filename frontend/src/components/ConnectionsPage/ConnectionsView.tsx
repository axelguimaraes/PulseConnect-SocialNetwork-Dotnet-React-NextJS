'use client';

import { useGetConnections } from '@/hooks/useConnections';
import CardSkeleton from './CardSkeleton';
import ConnectionCard from './ConnectionCard';
import InformationMessage from './InformationMessage';
import { useEffect, useState } from 'react';
import { User } from '@/types/Users';
import { getUserById } from '@/services/Users';
import { useSession } from 'next-auth/react';

type ConnectionsViewProps = {
	userId: string;
};

const ConnectionsView: React.FunctionComponent<ConnectionsViewProps> = ({
	userId,
}): React.ReactNode => {
	const {
		isLoading: connectionsLoading,
		isError: connectionsError,
		data: connections,
		error: connectionsErrorDetail,
	} = useGetConnections(userId);

	const [users, setUsers] = useState<Map<string, User>>(new Map());
	const [loadingUsers, setLoadingUsers] = useState<boolean>(false);

	const { data: session } = useSession();

	useEffect(() => {
		const fetchUserDetails = async (userId: string) => {
			try {
				const user = await getUserById(userId);
				if (user && user.id !== session?.user.id) {
					setUsers((prevUsers) => {
						const newUsers = new Map(prevUsers);
						newUsers.set(user.id, user);
						return newUsers;
					});
				} else {
					console.warn(`User with ID ${userId} not found.`);
				}
			} catch (error) {
				console.error(`Error fetching user with ID ${userId}:`, error);
			}
		};

		// Use a Set to store unique user IDs
		const uniqueUserIds = new Set<string>();

		console.log("Connections: ", connections)

		// Fetch user details for each connection
		if (connections) {
			connections.forEach((connection) => {
				uniqueUserIds.add(connection.userId1);
				uniqueUserIds.add(connection.userId2);
			});

			// Fetch user details for each unique user ID
			uniqueUserIds.forEach((uniqueUserId) => {
				fetchUserDetails(uniqueUserId);
			});
		}
	}, [connections]);

	if (connectionsLoading || loadingUsers)
		return (
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{Array.from({ length: 8 }).map((_, index: number) => (
					<CardSkeleton key={`ConnectionView-${index}`} />
				))}
			</div>
		);

	if (connectionsError || connectionsErrorDetail)
		return (
			<InformationMessage title='Error!' message={connectionsErrorDetail?.message} />
		);

	if (!connections?.length)
		return (
			<InformationMessage
				title='No Connections Found!'
				message={
					'You have not connected with anyone yet. Search for users and send them a connection request.'
				}
			/>
		);

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{Array.from(users.values()).map((user: User) => (
				<ConnectionCard
					key={`${user.id}-${user.userName}`} // Use a combination of id and userName
					userId={user.id}
					userName={user.userName}
					firstName={user.firstName}
					lastName={user.lastName}
					profileImageURL={user.profileImageURL}
				/>
			))}
		</div>
	);
};

export default ConnectionsView;
