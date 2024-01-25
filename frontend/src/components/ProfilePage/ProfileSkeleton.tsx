import { Fragment } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const ProfileSkeleton: React.FunctionComponent = (): React.ReactNode => {
	return (
		<Fragment>
			<div className='relative w-full'>
				<Skeleton className='h-64 w-full' />
				<Skeleton className='absolute bottom-0 left-8 h-32 w-32 translate-y-16 transform rounded-full' />
			</div>
			<div className='mt-16 flex w-full flex-col gap-y-4'>
				<div className='flex flex-row items-center justify-between'>
					<div className='flex flex-col gap-y-2'>
						<div className='flex flex-row items-center justify-between gap-x-4'>
							<Skeleton className='h-5 w-32' />
							<Skeleton className='h-5 w-32' />
						</div>
						<Skeleton className='h-3.5 w-32' />
					</div>
					<Skeleton className='h-10 w-32' />
				</div>
				<div className='flex flex-col gap-y-2'>
					<Skeleton className='h-4 w-3/4 rounded-md' />
					<Skeleton className='h-4 w-1/2 rounded-md' />
				</div>
				<div className='flex flex-col gap-y-1'>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<Skeleton className='h-4 w-32' />
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<Skeleton className='h-4 w-64' />
						</div>
					</div>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<Skeleton className='h-4 w-48' />
						</div>
						<div className='flex flex-row items-center gap-x-2'>
							<Skeleton className='h-4 w-64' />
						</div>
					</div>
					<div className='flex flex-row items-center gap-x-2'>
						<Skeleton className='h-3.5 w-6' />
						<Skeleton className='h-3.5 w-24' />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileSkeleton;
