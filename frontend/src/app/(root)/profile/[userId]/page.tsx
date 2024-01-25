import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { ProfileView } from '@/components/ProfilePage';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';
import { getUserById } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile',
};

type ProfilePageProps = {
	params: { userId: string };
};

const ProfilePage: NextPage<ProfilePageProps> = async ({ params }) => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['user', params.userId],
		queryFn: () => getUserById(params.userId),
	});

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.APP} />
					<Title title='Profile' />
				</div>
				<Separator />
			</div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ProfileView userId={params.userId} />
			</HydrationBoundary>
		</Fragment>
	);
};

export default ProfilePage;
