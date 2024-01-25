import { type MetadataRoute } from 'next';

import { URL } from '@/data/constants';
import { APP_ROUTES } from '@/routes/APP';

const sitemap = (): MetadataRoute.Sitemap => {
	return [
		{
			url: URL,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.CONNECTIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.MESSAGES}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.PROFILE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.TERMS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.PRIVACY}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.MAINTENANCE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ROOT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.ACCOUNT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.NOTIFICATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.APPEARANCE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.GENERAL.LANGUAGE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.INTEGRATIONS}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.EMAIL}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.SETTINGS.ACCOUNT.DISABLE}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGN_IN}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGN_UP}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.SIGN_OUT}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.FORGOT_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${URL}${APP_ROUTES.AUTH.RESET_PASSWORD}`,
			lastModified: '10-30-2023',
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
};

export default sitemap;
