import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Account Settings',
};

const SettingsAccountPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-4'>
				<div className='flex flex-row items-center justify-between gap-4'>
					<BackButton url={APP_ROUTES.SETTINGS.ROOT} />
					<Title title='Account Settings' />
				</div>
				<Separator />
			</div>
		</Fragment>
	);
};

export default SettingsAccountPage;
