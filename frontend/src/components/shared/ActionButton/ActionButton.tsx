'use client';

import { ArrowLeft, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { buttonVariants } from '@/components/ui/button';
import { APP_ROUTES } from '@/routes/APP';

const ActionButton: React.FunctionComponent = (): React.ReactNode => {
	const { data: session } = useSession();

	if (!session) {
		return (
			<Link
				href={APP_ROUTES.AUTH.SIGN_IN}
				className={`${buttonVariants({ variant: 'default' })}`}>
				<LogIn className='mr-2 h-4 w-4' />
				Sign In
			</Link>
		);
	}

	return (
		<Link
			href={APP_ROUTES.APP}
			className={`${buttonVariants({ variant: 'default' })}`}>
			<ArrowLeft className='mr-2 h-4 w-4' />
			Go back
		</Link>
	);
};

export default ActionButton;
