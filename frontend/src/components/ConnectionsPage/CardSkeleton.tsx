import { Skeleton } from '@/components/ui/skeleton';

const CardSkeleton: React.FunctionComponent = (): React.ReactNode => {
	return (
		<div className='flex flex-col items-center justify-between gap-y-8 rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
			<div className='flex w-full flex-col'>
				<div className='flex w-full flex-col items-center justify-between gap-y-4'>
					<Skeleton className='h-16 w-16 rounded-full' />
					<div className='flex flex-col items-center justify-between gap-y-1 text-center'>
						<div className='flex flex-row items-center justify-between gap-x-2'>
							<Skeleton className='h-4 w-16' />
							<Skeleton className='h-4 w-16' />
						</div>
						<div className='text-sm text-muted-foreground'>
							<Skeleton className='h-4 w-32' />
						</div>
					</div>
				</div>
			</div>
			<Skeleton className='h-10 w-32 rounded-md' />
		</div>
	);
};

export default CardSkeleton;
