import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { DisableAccountForm } from '@/components/Forms';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CONTACT_EMAIL } from '@/data/constants';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Disable Account',
};

const DisableSettingsPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-4'>
				<div className='flex flex-row items-center justify-between gap-4'>
					<BackButton url={APP_ROUTES.SETTINGS.ROOT} />
					<Title title='Disable Account' />
				</div>
				<Separator />
			</div>
			<h2 className='text-lg font-semibold tracking-tight'>
				This will deactivate your account, read{' '}
				<span className='text-primary'>carefully</span> before continue.
			</h2>
			<div className='flex flex-col gap-y-4'>
				<p className='text-base leading-7 text-muted-foreground'>
					You are about to begin the process of deactivating your
					Pulse Connect account.
				</p>
				<p className='text-base leading-7 text-muted-foreground'>
					Your profile will become invisible to other users, and you
					will no longer be able to send or receive messages,
					connection requests, or engage with your network in Pulse
					Connect. Essentially, your presence on the platform will be
					temporarily suspended, so if you want to come back, you can
					reactivate your account at any time, and all your data will
					be restored.
				</p>
				<p className='text-base leading-7 text-muted-foreground'>
					If you have any uncertainties or inquiries, we recommend
					reaching out to our{' '}
					<a
						href={`mailto:${CONTACT_EMAIL}?subject=Disable Account`}
						className='text-primary underline underline-offset-4'>
						contact team
					</a>{' '}
					for further assistance.
				</p>
			</div>
			<h2 className='text-lg font-semibold tracking-tight'>
				What else should you know...
			</h2>
			<ul className='ml-6 list-disc text-sm [&>li]:mt-2'>
				<li>
					Some information may still be available on search engines
					such as Google or Bing.
				</li>
				<li>
					If you want to change your username, there is no need to
					deactivate your account, just edit in{' '}
					<Link
						href={APP_ROUTES.SETTINGS.GENERAL.ACCOUNT}
						className='text-primary underline underline-offset-4'>
						settings
					</Link>
					.
				</li>
				<li>
					To use your current username or email address with another
					Pulse Connect account, change them before deactivating this
					account.
				</li>
			</ul>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='destructive'>
						Continue
						<ArrowRight className='ml-2 h-4 w-4' />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Disable Account</DialogTitle>
						<DialogDescription>
							You are about to deactivate your account. <br />
							You can still reactivate it later, but we&apos;ll
							miss you until then.
						</DialogDescription>
					</DialogHeader>
					<DisableAccountForm />
				</DialogContent>
			</Dialog>
		</Fragment>
	);
};

export default DisableSettingsPage;
