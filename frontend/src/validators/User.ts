import { z } from 'zod';

import {
	firstNameConstraints,
	lastNameConstraints,
	maxLengthErrorMessage,
	minLengthErrorMessage,
} from './general';

export const UserProfileInformationSchema = z.object({
	firstName: firstNameConstraints(),
	lastName: lastNameConstraints(),
	bio: z
		.string()
		.optional()
		.or(
			z
				.string()
				.trim()
				.max(144, { message: maxLengthErrorMessage('Bio', 144) }),
		),
	country: z.string().optional(),
	city: z
		.string()
		.optional()
		.or(
			z
				.string()
				.trim()
				.min(3, { message: minLengthErrorMessage('City', 3) })
				.max(64, { message: maxLengthErrorMessage('City', 64) }),
		),
	customURL: z.string().optional().or(z.string().trim().url()),
});

export type UserProfileInformation = z.infer<
	typeof UserProfileInformationSchema
>;
