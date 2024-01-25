'use client';

import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Message = {
	text: string;
	sender: string;
	sent_at: Date;
	isDeleted: boolean;
};

type DropdownButtonProps = {
	isUserMessage: boolean;
	messageText: string;
	onDelete?: () => void;
};

const Chat = () => {
	const initialMessages: Message[] = [
		{
			text: 'Hello!',
			sender: 'user',
			sent_at: new Date('2022-01-01T12:30:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'Hi there!',
			sender: 'other',
			sent_at: new Date('2023-01-01T12:35:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'How are you?',
			sender: 'user',
			sent_at: new Date('2023-01-01T12:40:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'I am good. Thanks!',
			sender: 'other',
			sent_at: new Date('2023-01-01T12:45:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'Nice to hear!',
			sender: 'user',
			sent_at: new Date('2023-01-01T12:50:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'What have you been up to?',
			sender: 'user',
			sent_at: new Date('2023-01-01T12:55:00.000Z'),
			isDeleted: false,
		},
		{
			text: 'Not much, just working on some projects.',
			sender: 'other',
			sent_at: new Date('2023-01-01T13:00:00.000Z'),
			isDeleted: true,
		},
		{
			text: 'That sounds interesting!',
			sender: 'user',
			sent_at: new Date('2023-01-01T13:05:00.000Z'),
			isDeleted: false,
		},
		{
			text: "Yeah, it's been keeping me busy.",
			sender: 'other',
			sent_at: new Date('2023-01-01T13:10:00.000Z'),
			isDeleted: false,
		},
	];

	const formatTimestamp = (timestamp: Date): string => {
		const today = new Date();
		const isToday =
			timestamp.getDate() === today.getDate() &&
			timestamp.getMonth() === today.getMonth() &&
			timestamp.getFullYear() === today.getFullYear();

		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		if (isToday) {
			// If the message was sent today, display hh:mm
			return `${timestamp.getHours()}:${
				(timestamp.getMinutes() < 10 ? '0' : '') +
				timestamp.getMinutes()
			}`;
		} else if (timestamp.getFullYear() === today.getFullYear()) {
			// If the message was sent on a different day in the current year, display month+day
			return `${monthNames[timestamp.getMonth()]} ${timestamp.getDate()}`;
		} else {
			// If the message was sent on a different year, display month+day+year
			return `${
				monthNames[timestamp.getMonth()]
			} ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
		}
	};

	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [newMessage, setNewMessage] = useState<string>('');

	const sendMessage = () => {
		if (newMessage.trim() !== '') {
			const newMessageObj: Message = {
				text: newMessage,
				sender: 'user',
				sent_at: new Date(),
				isDeleted: false,
			};
			setMessages((prevMessages) => [...prevMessages, newMessageObj]);
			setNewMessage('');

			const inputElement = document.querySelector('.message-input input');
			if (inputElement) {
				inputElement.value = '';
			}
		}
	};

	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			});
		}
	};

	useEffect(() => {
		const scrollTimeout = setTimeout(() => {
			scrollToBottom();
		}, 50);

		return () => clearTimeout(scrollTimeout);
	}, [messages]);

	const handleDelete = (index: number) => {
		const updatedMessages = [...messages];
		updatedMessages[index] = {
			text: 'This message has been deleted.',
			sender: 'user',
			sent_at: new Date(),
			isDeleted: true,
		};
		setMessages(updatedMessages);
	};

	return (
		<div className='chat-container flex h-full w-full flex-col overflow-hidden'>
			<div className='user-info flex items-center p-2'>
				<Avatar>
					<AvatarImage src='' alt='Avatar' />
					<AvatarFallback>OU</AvatarFallback>
				</Avatar>
				<div className='ml-2'>
					<div className='text-lg font-semibold'>Other User</div>
					<div className='text-sm text-green-500'>Online</div>
				</div>
			</div>
			<hr className='my-4 border-t border-gray-500' />
			<div className='chat-window flex-1 overflow-y-auto'>
				{messages.map((message, index) => {
					if (message.isDeleted) {
						// If the message is deleted, render the system message on the same side as the sender
						return (
							<div
								key={index}
								className={`message-box ${
									message.sender === 'user'
										? 'flex justify-end'
										: 'flex justify-start'
								} items-center`}>
								<div
									className={`max-w-xs p-4 ${
										message.sender === 'user'
											? 'border border-gray-500 bg-transparent text-gray-300'
											: 'bg-orange-500 text-white'
									} rounded-lg`}
									style={{ fontStyle: 'italic' }}>
									<span>
										This user&apos;s message has been deleted.
									</span>
									<div className='text-xs text-gray-500'>
										{formatTimestamp(message.sent_at)}
									</div>
								</div>
							</div>
						);
					}

					return (
						<div
							key={index}
							className={`message-box ${
								message.sender === 'user'
									? 'flex justify-end'
									: 'flex justify-start'
							} items-center`}>
							{message.sender === 'user' ? (
								<div className='mr-2'>
									<DropdownButton
										isUserMessage={true}
										messageText={message.text}
										onDelete={() => handleDelete(index)}
									/>
								</div>
							) : null}
							<div
								className={`max-w-xs p-4 ${
									message.sender === 'user'
										? 'border border-gray-500 bg-transparent text-gray-300'
										: 'bg-orange-500 text-white'
								} rounded-lg`}>
								{message.sender === 'system' ? (
									<span>{message.text}</span>
								) : (
									<span>{message.text}</span>
								)}
								<div className='text-xs text-gray-500'>
									{formatTimestamp(message.sent_at)}
								</div>
							</div>
							{message.sender !== 'user' ? (
								<div className='ml-2'>
									<DropdownButton
										isUserMessage={false}
										messageText={message.text}
									/>
								</div>
							) : null}
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>
			<hr className='my-4 border-t border-gray-500' />
			<div className='message-input flex '>
				<input
					type='text'
					placeholder='Type your message...'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='w-full max-w-screen-lg rounded-md p-2 text-black'
				/>
				<button
					onClick={sendMessage}
					className='ml-2 w-40 rounded-md bg-orange-500 p-2 text-white'>
					Send
				</button>
			</div>
		</div>
	);
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
	isUserMessage,
	messageText,
	onDelete,
}) => {
	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(messageText);
		} catch (error) {
			console.error('Failed to copy text to clipboard', error);
		}
	};

	const handleDelete = () => {
		// Open the AlertDialog when the user clicks "Delete"
		setIsAlertDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		// Close the AlertDialog and perform the actual delete
		setIsAlertDialogOpen(false);
		if (onDelete) onDelete();
	};

	const handleCancelDelete = () => {
		// Close the AlertDialog when the user cancels the delete operation
		setIsAlertDialogOpen(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<MoreVertical className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					{isUserMessage && (
						<DropdownMenuItem onClick={handleDelete}>
							Delete
						</DropdownMenuItem>
					)}
					<DropdownMenuItem onClick={handleCopy}>
						Copy text
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Render the AlertDialog */}
			<AlertDialog
				open={isAlertDialogOpen}
				onOpenChange={(open) => setIsAlertDialogOpen(open)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
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
		</>
	);
};

export default Chat;
