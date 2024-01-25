import { Skeleton } from '@/components/ui/skeleton';

const NotificationSkeleton: React.FunctionComponent = (): React.ReactNode => {
	return (
		<div className='flex w-full flex-row items-center justify-start gap-x-2 p-2'>
			<Skeleton className='h-10 w-10 rounded-full' />
			<div className='flex w-full flex-col items-start justify-between gap-2'>
				<div className='flex w-full flex-row items-center justify-start gap-x-4'>
					<Skeleton className='h-4 w-32' />
					<Skeleton className='h-4 w-64' />
				</div>
				<div className='flex w-full flex-row items-center justify-start gap-x-2'>
					<Skeleton className='h-3 w-16' />
					<Skeleton className='h-3 w-8' />
				</div>
			</div>
		</div>
	);
};

export default NotificationSkeleton;
