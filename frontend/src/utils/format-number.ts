export const formatNumber = (number: number) => {
	if (number == null || number == undefined) {
		return "0"
	}
	const suffixes = ['', 'K', 'M', 'B'];
	let tier = 0;

	while (number >= 1000 && tier < suffixes.length - 1) {
		number /= 1000;
		tier++;
	}

	return tier === 0
		? number.toString()
		: `${number.toFixed(number % 1 === 0 ? 0 : 1)}${suffixes[tier]}`;
};
