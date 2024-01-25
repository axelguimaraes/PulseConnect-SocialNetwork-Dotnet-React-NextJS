import { type Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'Pulse Connect - Authentication',
};

type AuthLayoutProps = {
	children: React.ReactNode;
};

const AuthLayout: React.FunctionComponent<AuthLayoutProps> = ({
	children,
}): React.ReactNode => {
	return (
		<main className='flex h-screen w-full flex-row'>
			<div className='hidden w-1/2 flex-col items-center justify-center bg-foreground lg:flex'>
				<Image
					src='/assets/logo/Logo Transparent.svg'
					alt='Logo'
					width={512}
					height={512}
					className='h-1/2 w-1/2'
				/>
			</div>
			{children}
		</main>
	);
};

export default AuthLayout;
