import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import {
	ConnectionsView,
	PendingConnectionsView,
} from '@/components/ConnectionsPage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APP_ROUTES } from '@/routes/APP';
import {
	getConnectionsById,
	getPendingConnectionsById,
} from '@/services/Connections';

export const metadata: Metadata = {
	title: 'Pulse Connect - Connections',
};

const ConnectionsPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');

	const queryClient = new QueryClient();
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ['user', session.user.id, 'connections'],
			queryFn: () => getConnectionsById(session.user.id),
		}),
		queryClient.prefetchQuery({
			queryKey: ['user', session.user.id, 'connections', 'pending'],
			queryFn: () => getPendingConnectionsById(session.user.id),
		}),
	]);

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.APP} />
					<Title title='Connections' />
				</div>
				<Separator />
			</div>
			<Tabs defaultValue='connections' className='flex w-full flex-col'>
				<TabsList>
					<TabsTrigger value='connections' className='w-full'>
						Connections
					</TabsTrigger>
					<TabsTrigger value='pending' className='w-full'>
						Pending
					</TabsTrigger>
				</TabsList>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<TabsContent value='connections' className='mt-8'>
						<ConnectionsView userId={session.user.id} />
					</TabsContent>
					<TabsContent value='pending' className='mt-8'>
						<PendingConnectionsView userId={session.user.id} />
					</TabsContent>
				</HydrationBoundary>
			</Tabs>
		</Fragment>
	);
};

export default ConnectionsPage;
