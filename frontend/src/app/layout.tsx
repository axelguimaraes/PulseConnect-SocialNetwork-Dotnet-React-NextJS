import '@/styles/globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { URL } from '@/data/constants';

export const metadata: Metadata = {
	title: 'Pulse Connect',
	description: 'This is an evaluation project of the LDS curricular unit.',
	applicationName: 'Pulse Connect',
	authors: [
		{ name: 'Axel Guimarães' },
		{ name: 'Daniel Teixeira' },
		{ name: 'Hugo Ribeiro' },
		{ name: 'Márcio Ribeiro' },
		{ name: 'Sérgio Félix' },
	],
	keywords: ['pulse', 'connect', 'pulse connect', 'pulseconnect'],
	themeColor: '#ffffff',
	icons: [
		{ rel: 'icon', url: '/favicon.ico' },
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192x192',
			url: '/android-chrome-192x192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
		{
			rel: 'mask-icon',
			color: '#f97316',
			url: '/safari-pinned-tab.svg',
		},
	],
	manifest: '/site.webmanifest',
	openGraph: {
		title: 'Pulse Connect',
		description:
			'This is an evaluation project of the LDS curricular unit.',
		url: URL,
		siteName: 'Pulse Connect',
		images: [
			{
				url: `${URL}/og-image.png`,
				width: 1200,
				height: 630,
				alt: 'Pulse Connect',
			},
		],
		locale: 'en-US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Pulse Connect',
		description:
			'This is an evaluation project of the LDS curricular unit.',
		creator: '@pulseconnect',
		images: [
			{
				url: `${URL}/twitter-image.png`,
				width: 1200,
				height: 630,
				alt: 'Pulse Connect',
			},
		],
	},
	appleWebApp: {},
	other: {
		'apple-mobile-web-app-title': 'Pulse Connect',
		'application-name': 'Pulse Connect',
		'msapplication-TileColor': '#ffffff',
		'msapplication-TileImage': '/mstile-144x144.png',
	},
};

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout: React.FunctionComponent<RootLayoutProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<html lang='en'>
			<body
				className={`h-screen font-sans ${GeistSans.variable} ${GeistMono.variable} flex w-full flex-col`}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
