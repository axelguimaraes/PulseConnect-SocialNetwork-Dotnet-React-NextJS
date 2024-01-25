import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
	title: 'Pulse Connect - Home',
};

const HomePage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-y-4'>
				<div className='flex flex-row items-center justify-between gap-x-4'>
					<Title title='Home' />
				</div>
				<Separator />
			</div>
		</Fragment>
	);
};

export default HomePage;
