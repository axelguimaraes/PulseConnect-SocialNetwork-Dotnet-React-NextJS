import { ChevronRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

type SettingsItemProps = {
	url: string;
	label: string;
	text: string;
	icon: LucideIcon;
};

const SettingsItem: React.FunctionComponent<SettingsItemProps> = ({
	url,
	label,
	text,
	icon: Icon,
}): React.ReactNode => {
	return (
		<Link
			href={url}
			className='flex w-full flex-col items-start justify-between gap-4 rounded-md border p-4 hover:bg-accent sm:flex-row sm:items-center'>
			<div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
				<div className='rounded-md border border-border bg-background p-2'>
					<Icon className='h-5 w-5' />
				</div>
				<div className='flex flex-col items-start justify-between '>
					<label className='cursor-pointer text-sm font-medium'>
						{label}
					</label>
					<p className='text-xs text-muted-foreground'>{text}</p>
				</div>
			</div>
			<ChevronRight className='h-5 w-5' />
		</Link>
	);
};

export default SettingsItem;
