import { redirect } from 'next/navigation';
import { type Metadata, type NextPage } from 'next/types';

import Countdown from '@/components/MaintenancePage/Countdown';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Maintenance',
};

const MaintenancePage: NextPage = (): React.ReactNode => {
	if (process.env.MAINTENANCE_MODE === 'false') redirect(APP_ROUTES.APP);
	return (
		<main className='flex h-screen flex-col items-center justify-center gap-8'>
			<Countdown
				targetDate={new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)}
			/>
			<h1 className='text-center text-4xl font-extrabold tracking-tight lg:text-5xl'>
				We are currently undergoing{' '}
				<span className='text-primary'>maintenance</span>! <br />
				Please try again later.
			</h1>
		</main>
	);
};

export default MaintenancePage;
