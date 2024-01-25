import { z } from 'zod';

import {
	emailConstraints,
	firstNameConstraints,
	lastNameConstraints,
	maxLengthErrorMessage,
	minLengthErrorMessage,
} from './general';

export const ContactInformationSchema = z.object({
	firstName: firstNameConstraints(),
	lastName: lastNameConstraints(),
	email: emailConstraints(),
	message: z
		.string()
		.trim()
		.min(3, { message: minLengthErrorMessage('Message', 3) })
		.max(144, { message: maxLengthErrorMessage('Message', 144) }),
});

export type ContactInformation = z.infer<typeof ContactInformationSchema>;
