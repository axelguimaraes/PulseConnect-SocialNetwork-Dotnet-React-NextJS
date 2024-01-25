'use client';

import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useTimer } from 'react-timer-hook';

import CountdownBox from './CountdownBox';

type CountdownProps = {
	targetDate: Date;
};

const Countdown: React.FunctionComponent<CountdownProps> = ({
	targetDate,
}): React.ReactNode => {
	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp: targetDate,
		autoStart: true,
		onExpire: () => redirect('/'),
	});
	return (
		<div className='flex flex-row items-center justify-between gap-x-12'>
			<CountdownBox value={days} label='Day(s)' />
			<CountdownBox value={hours} label='Hour(s)' />
			<Image
				src='/assets/logo/Logo Transparent.svg'
				alt='Logo'
				width={32}
				height={32}
				className='h-48 w-auto'
			/>
			<CountdownBox value={minutes} label='Minute(s)' />
			<CountdownBox value={seconds} label='Second(s)' />
		</div>
	);
};

export default Countdown;
