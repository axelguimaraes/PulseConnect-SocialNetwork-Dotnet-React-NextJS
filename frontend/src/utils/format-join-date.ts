export const formatJoinDate = (dateTime: string): string => {
	const date = new Date(dateTime);

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};
