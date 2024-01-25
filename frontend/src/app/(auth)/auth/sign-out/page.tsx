'use client';

import { type NextPage } from 'next/types';
import { signOut } from 'next-auth/react';

import { APP_ROUTES } from '@/routes/APP';

const SignOutPage: NextPage = (): React.ReactNode => {
	try {
		signOut({ redirect: true, callbackUrl: APP_ROUTES.AUTH.SIGN_IN })
			.then(() => {
				console.log('User has signed out successfully!');
			})
			.catch((error) => {
				console.error('User has failed to sign out!', error);
			});
	} catch (error) {
		console.error('Unexpected error has occurred!', error);
	} finally {
		return null;
	}
};

export default SignOutPage;
