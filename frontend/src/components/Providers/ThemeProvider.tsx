'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { type ThemeProviderProps as NextThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: React.FunctionComponent<NextThemeProviderProps> = ({
	children,
	...props
}): React.ReactNode => {
	return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
