import { Fragment } from 'react';

import { Chatbar } from '@/components/layout/Chatbar';
import { Footer } from '@/components/layout/Footer';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

type FeedLayoutProps = {
	children: React.ReactNode;
};

const FeedLayout: React.FunctionComponent<FeedLayoutProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Fragment>
			<Navbar />
			<div className='relative flex h-full w-full flex-row justify-between overflow-hidden'>
				<Sidebar />
				<main className='flex max-w-5xl flex-1 flex-col items-start justify-start gap-8 overflow-y-auto overflow-x-hidden border-x p-16'>
					{children}
				</main>
				<Chatbar />
			</div>
			<MobileSidebar />
			<Footer />
		</Fragment>
	);
};

export default FeedLayout;
