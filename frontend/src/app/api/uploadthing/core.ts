import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { getServerAuthSession } from '../auth/[...nextauth]/route';

const f = createUploadthing();

export const ourFileRouter = {
	messageAttachment: f({
		image: { maxFileSize: '2MB', maxFileCount: 1 },
		video: { maxFileSize: '4MB', maxFileCount: 1 },
	})
		.middleware(async ({}) => {
			const session = await getServerAuthSession();

			if (!session) throw new Error('Unauthorized!');

			return {};
		})
		.onUploadComplete(({ file }) => {
			console.log('file url', file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return {};
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
