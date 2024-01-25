'use client';

import Image from 'next/image';
import Link from 'next/link';

type MobileSidebarItemProps = {
	url: string;
	title: string;
	icon: string;
};

const MobileSidebarItem: React.FunctionComponent<MobileSidebarItemProps> = ({
	url,
	icon,
}): React.ReactNode => {
	return (
		<Link
			href={url}
			className='flex flex-col items-center justify-between gap-y-2'>
			<Image
				src={icon}
				alt='Icon'
				width={20}
				height={20}
				className='h-5 w-5 dark:invert'
			/>
		</Link>
	);
};

export default MobileSidebarItem;
