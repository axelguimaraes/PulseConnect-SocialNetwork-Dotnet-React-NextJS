import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';

import { ForgotPasswordForm } from '@/components/Forms';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Forgot Password',
};

const ForgotPasswordPage: NextPage = (): React.ReactNode => {
	return (
		<div className='flex flex-1 flex-col items-center justify-center'>
			<Card className='w-3/4'>
				<CardHeader>
					<CardTitle>Forgot Password</CardTitle>
					<CardDescription>
						Enter your email below to reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ForgotPasswordForm />
				</CardContent>
				<CardFooter>
					<p className='text-sm text-muted-foreground'>
						By continuing, you agree to our{' '}
						<Link href={APP_ROUTES.TERMS} className='underline'>
							Terms & Conditions
						</Link>{' '}
						and{' '}
						<Link href={APP_ROUTES.PRIVACY} className='underline'>
							Privacy Policy
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default ForgotPasswordPage;
