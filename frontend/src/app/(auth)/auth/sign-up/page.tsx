import Link from 'next/link';
import { redirect } from 'next/navigation';
import { type Metadata, type NextPage } from 'next/types';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { SignUpForm } from '@/components/Forms';
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
	title: 'Pulse Connect - Sign Up',
};

const SignUpPage: NextPage = async () => {
	const session = await getServerAuthSession();
	if (session) redirect(APP_ROUTES.APP);
	
	return (
		<div className='flex flex-1 flex-col items-center justify-center'>
			<Card className='w-3/4'>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>
						Enter below the credentials to create your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<SignUpForm />
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

export default SignUpPage;
