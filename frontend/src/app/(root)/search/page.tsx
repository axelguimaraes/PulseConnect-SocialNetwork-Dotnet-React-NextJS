import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import SearchUsersView from '@/components/SearchPage/SearchUsersView';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';
import { getUsersByUsername } from '@/services/Users';

export const metadata: Metadata = {
	title: 'Pulse Connect - Profile',
};

type SearchPageProps = {
	searchParams: { query: string };
};

const SearchPage: NextPage<SearchPageProps> = async ({ searchParams }) => {
	if (!searchParams.query) redirect(APP_ROUTES.APP);

	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', searchParams.query],
		queryFn: () => getUsersByUsername(searchParams.query),
	});

	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<BackButton url={APP_ROUTES.APP} />
					<Title title='Search Results' />
				</div>
				<Separator />
			</div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<SearchUsersView query={searchParams.query} />
			</HydrationBoundary>
		</Fragment>
	);
};

export default SearchPage;
