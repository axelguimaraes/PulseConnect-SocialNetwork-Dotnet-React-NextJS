'use client';

import { Ban, Link2, MoreVertical, X } from 'lucide-react';
import { Fragment, useState } from 'react';

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
import { toast } from '@/components/ui/use-toast';

type MoreOptionsButtonProps = {
	userId: string;
	userName: string;
};

const MoreOptionsButton: React.FunctionComponent<MoreOptionsButtonProps> = ({
	userId,
	userName,
}): React.ReactNode => {
	const [showBlockDialog, setShowBlockDialog] = useState<boolean>(false);

	const copyToClipboard = async () => {
		const url = window.location.href;
		await navigator.clipboard.writeText(url);
		toast({
			title: 'Profile URL copied to clipboard.',
		});
	};

	const handleBlock = () => {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				toast({
					title: 'You submitted the following values:',
					description: (
						<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
							<code className='text-white'>
								{JSON.stringify({ userId }, null, 2)}
							</code>
						</pre>
					),
				});
				resolve();
			}, 5000);
		});
	};

	return (
		<Fragment>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant='outline' size='icon'>
									<MoreVertical className='h-4 w-4' />
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
						<DropdownMenuItem
							onClick={copyToClipboard}
							className='cursor-pointer'>
							<Link2 className='mr-2 h-4 w-4' />
							<span>Copy profile link</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setShowBlockDialog((prev) => !prev)}
							className='cursor-pointer'>
							<Ban className='mr-2 h-4 w-4' />
							<span>Block @{userName}</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog
				open={showBlockDialog}
				onOpenChange={setShowBlockDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Block @{userName}</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to block @{userName}?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							<X className='mr-2 h-4 w-4' />
							<span>Cancel</span>
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleBlock}
							className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
							<Ban className='mr-2 h-4 w-4' />
							<span>Block</span>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Fragment>
	);
};

export default MoreOptionsButton;
