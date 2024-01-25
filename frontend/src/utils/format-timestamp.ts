export const formatTimestamp = (dateTime: string): string => {
	const pastDate = new Date(dateTime);
	const currentDate = new Date();

	const timeDifference = currentDate.getTime() - pastDate.getTime();

	if (timeDifference < 0) return 'Time traveller';

	const seconds = Math.floor(timeDifference / 1000);
	if (seconds < 60) return seconds + ' s';

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return minutes + ' m';

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return hours + ' h';

	const days = Math.floor(hours / 24);
	if (days < 7) return days + ' d';

	const weeks = Math.floor(days / 7);
	if (weeks < 4) return weeks + ' w';

	const months = Math.floor(weeks / 4);
	if (months < 12) return months + ' m';

	const years = Math.floor(months / 12);
	return years + ' y';
};
