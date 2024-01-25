'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Badge } from '@/components/ui/badge';

type ThemeCardProps = {
	themeType: string;
	icon: string;
	label: string;
	image: string;
	alt: string;
};

const ThemeCard: React.FunctionComponent<ThemeCardProps> = ({
	themeType,
	icon,
	label,
	image,
	alt,
}): React.ReactNode => {
	const { setTheme, theme } = useTheme();
	const isActive = theme === themeType;
	return (
		<button
			onClick={() => setTheme(themeType)}
			className={clsx(
				'w-96 cursor-pointer rounded-md border border-input bg-muted',
				isActive && 'border-primary',
			)}>
			<div
				className={clsx(
					'border-special-top flex w-full flex-row flex-wrap items-center justify-between gap-x-2 border-b border-b-input px-6 py-4',
					isActive && 'border-b-primary',
				)}>
				<div className='flex flex-row items-center justify-between gap-x-2'>
					<Image
						src={icon}
						alt={alt}
						width={20}
						height={20}
						className='h-5 w-5 dark:invert'
					/>
					<span className='text-sm font-medium'>{label}</span>
				</div>
				{isActive && (
					<Badge
						variant='outline'
						className='border-primary text-primary'>
						Active
					</Badge>
				)}
			</div>
			<div className='border-special-bottom flex flex-col items-center justify-between gap-y-6 bg-background px-6 py-6'>
				<Image
					src={image}
					alt={alt}
					width={256}
					height={256}
					className='w-full rounded-md'
				/>
				<small className='text-left text-sm font-normal leading-none text-muted-foreground'>
					This theme will be active when your system is set to &quot;
					{themeType} mode&quot;.
				</small>
			</div>
		</button>
	);
};

export default ThemeCard;
