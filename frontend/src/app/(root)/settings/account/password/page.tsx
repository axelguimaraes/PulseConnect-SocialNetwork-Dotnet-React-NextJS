import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { ChangePasswordForm } from '@/components/Forms';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Change Password',
};

const SettingsPasswordPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-4'>
				<div className='flex flex-row items-center justify-between gap-4'>
					<BackButton url={APP_ROUTES.SETTINGS.ROOT} />
					<Title title='Change Password' />
				</div>
				<Separator />
			</div>
			<h2 className='text-lg font-semibold tracking-tight'>
				Change here your new password!
			</h2>
			<p className='text-base leading-7 text-muted-foreground'>
				Change your password if you suspect that your account has been
				compromised, or you want to ensure that your password is strong
				and less susceptible to hacking attempts.
			</p>
			<ChangePasswordForm />
		</Fragment>
	);
};

export default SettingsPasswordPage;
