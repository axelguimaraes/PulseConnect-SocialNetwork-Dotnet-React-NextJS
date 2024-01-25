import { Loader2 } from 'lucide-react';

const Loading: React.FunctionComponent = (): React.ReactNode => {
	return (
		<main className='mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8'>
			<Loader2 className='h-16 w-16 animate-spin text-primary' />
		</main>
	);
};

export default Loading;
