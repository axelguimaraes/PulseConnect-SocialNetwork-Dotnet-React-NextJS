'use client';

import { Check, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useGetNotifications } from '@/hooks/useNotifications';
import { APP_ROUTES } from '@/routes/APP';
import { formatTimestamp } from '@/utils/format-timestamp';
import { getInitials } from '@/utils/get-initials';

import NotificationsSkeleton from './NotificationsSkeleton';

type NotificationsViewProps = {
	userId: string;
};

const NotificationsView: React.FunctionComponent<NotificationsViewProps> = ({
	userId,
}): React.ReactNode => {
	const {
		isLoading,
		isError,
		data: notifications,
		error,
	} = useGetNotifications(userId);

	if (isLoading)
		return (
			<div className='flex w-full flex-col gap-4 py-2'>
				{Array.from({ length: 8 }).map((_, index: number) => (
					<NotificationsSkeleton key={`NotificationsView-${index}`} />
				))}
			</div>
		);

	if (isError) throw new Error(error.message);

	if (!notifications?.length) return <div>Notifications not found!</div>;

	return (
		<div className='flex w-full flex-col gap-4 py-2'>
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className='group flex w-full flex-row items-center justify-between gap-x-2 rounded-md p-2 hover:bg-accent'>
					<Link
						href={`${APP_ROUTES.PROFILE}/${notification.id}`}
						className='flex w-full flex-row items-center justify-between gap-x-2'>
						<Avatar>
							<AvatarImage
								src={notification.profileImageURL}
								alt={`${notification.firstName} ${notification.lastName} Profile Image`}
							/>
							<AvatarFallback>
								{getInitials(
									notification.firstName,
									notification.lastName,
								)}
							</AvatarFallback>
						</Avatar>
						<div className='flex w-full flex-col items-start justify-between'>
							<div className='flex flex-row items-center justify-between gap-x-2'>
								<span className='text-base font-medium'>
									{notification.firstName}&nbsp;
									{notification.lastName}
								</span>
								<p className='font-base truncate text-sm text-muted-foreground'>
									{notification.message}
								</p>
							</div>
							<div className='flex flex-row items-start justify-between gap-x-2'>
								<span className='font-base text-xs text-muted-foreground'>
									@{notification.userName}
								</span>
								<small className='font-base text-xs text-muted-foreground'>
									{formatTimestamp(notification.createdAt)}
								</small>
							</div>
						</div>
					</Link>
					{notification.isRead && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Check className='h-4 w-4 text-primary' />
								</TooltipTrigger>
								<TooltipContent>
									<p>Notification read</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant='ghost'
											size='icon'
											className='rounded-full'>
											<MoreHorizontal className='h-4 w-4 text-primary' />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>More options</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>More options</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								{!notification.isRead && (
									<DropdownMenuItem className='cursor-pointer'>
										<Check className='mr-2 h-4 w-4' />
										<span>Mark as read</span>
									</DropdownMenuItem>
								)}
								<DropdownMenuItem className='cursor-pointer'>
									<Trash className='mr-2 h-4 w-4' />
									<span>Remove this notification</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			))}
		</div>
	);
};

export default NotificationsView;
