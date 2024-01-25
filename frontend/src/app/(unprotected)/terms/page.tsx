import Image from 'next/image';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ActionButton } from '@/components/shared/ActionButton';
import { CONTACT_EMAIL } from '@/data/constants';
import { APP_ROUTES } from '@/routes/APP';

export const metadata: Metadata = {
	title: 'Pulse Connect - Terms & Conditions',
};

const TermsPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<header className='mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-4 py-8 sm:px-6 lg:px-8'>
				<Link href={APP_ROUTES.APP}>
					<Image
						src='/assets/logo/Logo Transparent.svg'
						alt='Logo'
						width={128}
						height={40}
						priority={true}
						className='h-10 w-auto'
					/>
				</Link>
				<ActionButton />
			</header>
			<main className='mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-4 py-8 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-start justify-between gap-y-8'>
					<h1 className='text-4xl font-extrabold tracking-tight'>
						Terms & Conditions
					</h1>
					<p className='text-base font-normal leading-7'>
						Last Updated: 10-30-2023 12:00 AM WEST
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						1. Acceptance of Terms
					</h2>
					<p className='text-base font-normal leading-7'>
						By registering and using Pulse Connect, you agree to be
						bound by these Terms and Conditions. If you do not agree
						with any part of these terms, please refrain from using
						our service.
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						2. User Registration and Account
					</h2>
					<div className='flex flex-col items-start justify-between gap-y-2'>
						<p className='text-base font-normal leading-7'>
							2.1. You must register and create an account to use
							Pulse Connect.
						</p>
						<p className='text-base font-normal leading-7'>
							2.2. You are responsible for maintaining the
							confidentiality of your account credentials and for
							all activities that occur under your account.
						</p>
					</div>
					<h2 className='text-3xl font-semibold tracking-tight'>
						3. User Conduct
					</h2>
					<div className='flex flex-col items-start justify-between gap-y-2'>
						<p className='text-base font-normal leading-7'>
							3.1. Users of Pulse Connect must comply with all
							applicable laws and not engage in any harmful
							activities, including but not limited to:
						</p>
						<ul className='ml-6 list-disc [&>li]:mt-2'>
							<li>
								Harassment, discrimination, or abusive behavior
								towards other users.
							</li>
							<li>
								Spamming or the use of any automated tools for
								communication.
							</li>
							<li>
								Unauthorized distribution of copyrighted
								material.
							</li>
						</ul>
					</div>
					<h2 className='text-3xl font-semibold tracking-tight'>
						4. User Data and Privacy
					</h2>
					<div className='flex flex-col items-start justify-between gap-y-2'>
						<p className='text-base font-normal leading-7'>
							4.1. We collect and store basic user information for
							authentication and personal data you provide during
							registration and use of the service. For detailed
							information on how we handle your data, please refer
							to our Privacy Policy.
						</p>
						<p className='text-base font-normal leading-7'>
							4.2. Pulse Connect allows users to import their
							social media followers from platforms such as
							Twitter, solely with their consent. No data from
							other social media accounts is shared without user
							permission.
						</p>
					</div>
					<h2 className='text-3xl font-semibold tracking-tight'>
						5. Messaging
					</h2>
					<p className='text-base font-normal leading-7'>
						5.1. Users can only communicate with other users they
						are connected with on Pulse Connect.
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						6. Cookies and Local Storage
					</h2>
					<div className='flex flex-col items-start justify-between gap-y-2'>
						<p className='text-base font-normal leading-7'>
							6.1. We use basic cookies, including Next.js and
							NextAuth cookies, to enhance the user experience.
						</p>
						<p className='text-base font-normal leading-7'>
							6.2. Local storage is used to store user preferences
							and settings.
						</p>
					</div>
					<h2 className='text-3xl font-semibold tracking-tight'>
						7. Google ReCaptcha V3
					</h2>
					<p className='text-base font-normal leading-7'>
						7.1. We use Google ReCaptcha V3 for forms to ensure
						security and prevent automated spam submissions.
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						8. Data Sharing
					</h2>
					<p className='text-base font-normal leading-7'>
						8.1. We do not sell or share user data with third-party
						buyers or partners.
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						9. Changes to Terms
					</h2>
					<p className='text-base font-normal leading-7'>
						9.1. Pulse Connect may update these Terms and
						Conditions. Users will be notified of any changes, and
						continued use of the service after updates implies
						acceptance of the new terms.
					</p>
					<h2 className='text-3xl font-semibold tracking-tight'>
						10. Contact Information
					</h2>
					<p className='text-base font-normal leading-7'>
						If you have any questions or concerns about these Terms
						and Conditions, please contact us at{' '}
						<a
							href={`mailto:${CONTACT_EMAIL}?subject=Question about Terms and Conditions.`}
							className='text-primary'>
							{CONTACT_EMAIL}
						</a>
						.
					</p>
				</div>
			</main>
			<small className='flex w-full flex-row items-center justify-center border-t border-input p-1.5 text-xs text-muted-foreground'>
				Copyright &copy; {new Date().getFullYear()} Pulse Connect - All
				rights reserved.
			</small>
		</Fragment>
	);
};

export default TermsPage;
