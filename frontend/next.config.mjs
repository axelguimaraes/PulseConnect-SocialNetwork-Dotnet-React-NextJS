import million from 'million/compiler';

await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default million.next(config, { auto: { rsc: true }, mute: true });
