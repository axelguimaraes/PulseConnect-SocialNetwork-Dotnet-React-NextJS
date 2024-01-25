'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useGetMessages } from '@/hooks/useMessages';
import { APP_ROUTES } from '@/routes/APP';
import { type Message } from '@/types/Messages';
import { formatTimestamp } from '@/utils/format-timestamp';
import { getInitials } from '@/utils/get-initials';

type MessagesViewProps = {
	userId: string;
};

const MessagesView: React.FunctionComponent<MessagesViewProps> = ({
	userId,
}): React.ReactNode => {
	const {
		isLoading,
		isError,
		data: messages,
		error,
	} = useGetMessages(userId);

	const [selectedMessage, setSelectedMessage] = useState<Message | null>(
		null,
	);

	if (isLoading) return <div>Loading!</div>;

	if (isError) throw new Error(error.message);

	if (!messages?.length) return <div>Messages not found!</div>;

	const handleDeleteMessage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		message: Message,
	) => {
		// Prevent the default behavior of the button click
		event.preventDefault();
		setSelectedMessage(message);
	};

	const handleConfirmDelete = () => {
		if (selectedMessage) {
			// Log a message indicating that the message would be deleted
			alert(
				`TEST:: Message with ID ${selectedMessage.id} will be deleted.`,
			);
		}
		setSelectedMessage(null);
	};

	const handleCancelDelete = () => {
		setSelectedMessage(null);
	};

	return (
		<div className='flex w-full flex-col gap-4 py-2'>
			{messages.map((message) => (
				<Link
					key={message.id}
					href={`${APP_ROUTES.MESSAGES_CHAT(message.id)}`}
					className='flex w-full flex-row items-center justify-between gap-x-2 rounded-md p-2 hover:bg-accent'>
					<Avatar>
						<AvatarImage
							src={message.profileImageURL}
							alt={`${message.firstName} ${message.lastName} Profile Image`}
						/>
						<AvatarFallback>
							{getInitials(message.firstName, message.lastName)}
						</AvatarFallback>
					</Avatar>
					<div className='flex w-full flex-col items-start justify-between'>
						<div className='flex flex-row items-center justify-between gap-x-2'>
							<span className='text-base font-medium'>
								{message.firstName}&nbsp;
								{message.lastName}
							</span>
							<p className='font-base truncate text-sm text-muted-foreground'>
								{message.lastMessage}
							</p>
						</div>
						<div className='flex flex-row items-start justify-between gap-x-2'>
							<span className='font-base text-xs text-muted-foreground'>
								@{message.userName}
							</span>
							<small className='font-base text-xs text-muted-foreground'>
								{formatTimestamp(message.createdAt)}
							</small>
						</div>
					</div>
					{message.isRead && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Check className='h-4 w-4 text-primary' />
								</TooltipTrigger>
								<TooltipContent>
									<p>Message read</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					<Button
						variant='outline'
						size='icon'
						onClick={(event) =>
							handleDeleteMessage(event, message)
						}>
						<TrashIcon className='h-4 w-4' />
					</Button>
				</Link>
			))}
			{selectedMessage && (
				<AlertDialog
					open={Boolean(selectedMessage)}
					onOpenChange={() => setSelectedMessage(null)}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Confirm Deletion
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogDescription>
							Are you sure you want to delete this message? This
							action cannot be undone.
						</AlertDialogDescription>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCancelDelete}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleConfirmDelete}>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
};

export default MessagesView;
