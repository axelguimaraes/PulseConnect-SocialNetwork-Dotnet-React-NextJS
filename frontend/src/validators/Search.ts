import { z } from 'zod';

import {
	firstNameConstraints,
	lastNameConstraints,
	usernameConstraints,
} from './general';

export const SearchUserSchema = z.object({
	query: usernameConstraints()
		.or(firstNameConstraints())
		.or(lastNameConstraints()),
});

export type SearchUser = z.infer<typeof SearchUserSchema>;
