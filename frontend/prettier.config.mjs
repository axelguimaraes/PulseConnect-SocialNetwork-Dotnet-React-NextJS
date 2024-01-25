/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	printWidth: 80,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	jsxSingleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: 'always',
	endOfLine: 'lf',
	singleAttributePerLine: false,
	plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
