import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		NEXTAUTH_SECRET:
			process.env.NODE_ENV === 'production'
				? z.string()
				: z.string().optional(),
		NEXTAUTH_URL: z.preprocess(
			(str) => process.env.VERCEL_URL ?? str,
			process.env.VERCEL ? z.string() : z.string().url(),
		),
		RECAPTCHA_SECRET_KEY: z.string(),
		TWITTER_CLIENT_ID: z.string(),
		TWITTER_CLIENT_SECRET: z.string(),
		UPLOADTHING_SECRET: z.string(),
		UPLOADTHING_APP_ID: z.string(),
		MAINTENANCE_MODE: z.enum(['true', 'false']).default('false'),
		//SOCKET_URL: z.string().url(),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
		NEXT_PUBLIC_ENCRYPTION_KEY: z.string(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
			process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
		RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
		NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
		TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
		TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
		UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
		UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
		MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,
		//SOCKET_URL: process.env.SOCKET_URL,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
