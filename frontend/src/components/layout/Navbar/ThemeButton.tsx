'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type ThemeButtonProps = {
	themeType: string;
	title: string;
	icon: string;
};

const ThemeButton: React.FunctionComponent<ThemeButtonProps> = ({
	themeType,
	title,
	icon,
}): React.ReactNode => {
	const { setTheme, theme } = useTheme();
	const isActive = theme === themeType;
	return (
		<button
			className='flex w-full flex-row items-center justify-between'
			onClick={() => setTheme(themeType)}>
			<div className='flex flex-row items-center gap-x-2'>
				<Image
					src={icon}
					alt={`Icon to toggle theme to ${themeType} mode.`}
					width={16}
					height={16}
					className='h-4 w-4 dark:invert'
				/>
				<span className='w-full'>{title}</span>
			</div>
			{isActive && <Check className='h-4 w-4' />}
		</button>
	);
};

export default ThemeButton;
