import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { APP_ROUTES } from '@/routes/APP';

const NotFound: React.FunctionComponent = (): React.ReactNode => {
	return (
		<main className='mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8'>
			<Image
				src='/assets/logo/Logo Transparent.svg'
				alt='Logo'
				width={192}
				height={192}
				className='h-48 w-48 text-primary'
			/>
			<h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
				<span className='text-primary'>Oops!</span> It seems like you
				are lost.
			</h1>
			<p>
				The page you are looking for is not available. Try searching
				again or return to the home page.
			</p>
			<Link
				href={APP_ROUTES.APP}
				className={`${buttonVariants({ variant: 'default' })}`}>
				<ArrowLeft className='mr-2 h-4 w-4' />
				Go back
			</Link>
		</main>
	);
};

export default NotFound;
