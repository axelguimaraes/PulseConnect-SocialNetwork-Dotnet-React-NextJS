import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { APP_ROUTES } from '@/routes/APP';

type MessageButtonProps = {
	userId: string;
};

const MessageButton: React.FunctionComponent<MessageButtonProps> = ({
	userId,
}): React.ReactNode => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Link
						href={`${APP_ROUTES.MESSAGES}/${userId}`}
						className={`${buttonVariants({
							variant: 'outline',
							size: 'icon',
						})}`}>
						<MessageCircle className='h-4 w-4' />
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Send message</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default MessageButton;
