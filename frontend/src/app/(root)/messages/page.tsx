import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { MessagesView } from '@/components/MessagesPage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';
import { getMessagesById } from '@/services/Messages';

export const metadata: Metadata = {
	title: 'Pulse Connect - Messages',
};

const MessagesPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['user', session.user.id, 'messages'],
		queryFn: () => getMessagesById(session.user.id),
	});

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.APP} />
					<Title title='Messages' />
				</div>
				<Separator />
			</div>
			<div className='flex w-full flex-col items-start justify-between gap-8'>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<MessagesView userId={session.user.id} />
				</HydrationBoundary>
			</div>
		</Fragment>
	);
};

export default MessagesPage;
