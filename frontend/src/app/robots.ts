import { type MetadataRoute } from 'next';

import { URL } from '@/data/constants';

const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/private/',
		},
		sitemap: URL,
	};
};

export default robots;
