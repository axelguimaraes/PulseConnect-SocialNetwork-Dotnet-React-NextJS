import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import ThemeCard from '@/components/SettingsPage/ThemeCard';
import { BackButton } from '@/components/shared/BackButton';
import { Title } from '@/components/shared/Title';
import { Separator } from '@/components/ui/separator';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Appearance Settings',
};

const SettingsAppearancePage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');
	return (
		<Fragment>
			<div className='flex w-full flex-col items-start justify-between gap-4'>
				<div className='flex flex-row items-center justify-between gap-4'>
					<BackButton url={APP_ROUTES.SETTINGS.ROOT} />
					<Title title='Appearance Settings' />
				</div>
				<Separator />
			</div>
			<h2 className='text-lg font-semibold tracking-tight'>
				Choose how Pulse Connect looks to you!
			</h2>
			<p className='text-base leading-7 text-muted-foreground'>
				Select a single theme, or let us manage the theme based on the
				system settings of your device.
			</p>
			<div className='flex w-full flex-row flex-wrap items-center justify-between gap-4'>
				<ThemeCard
					themeType='light'
					icon={
						'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg=='
					}
					label='Light theme'
					image={'/assets/images/theme/light-theme.svg'}
					alt={'Light Theme'}
				/>
				<ThemeCard
					themeType='dark'
					icon={
						'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vb24iPjxwYXRoIGQ9Ik0xMiAzYTYgNiAwIDAgMCA5IDkgOSA5IDAgMSAxLTktOVoiLz48L3N2Zz4='
					}
					label='Dark theme'
					image={'/assets/images/theme/dark-theme.svg'}
					alt={'Dark Theme'}
				/>
			</div>
		</Fragment>
	);
};

export default SettingsAppearancePage;
