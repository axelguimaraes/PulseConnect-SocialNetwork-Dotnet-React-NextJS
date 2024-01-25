import { z } from 'zod';

import {
	emailConstraints,
	firstNameConstraints,
	lastNameConstraints,
	passwordConstraints,
	usernameConstraints,
} from './general';

export const SignInSchema = z.object({
	email: emailConstraints(),
	password: passwordConstraints(),
	remember: z.boolean().optional(),
});

export const SignUpSchema = z
	.object({
		firstName: firstNameConstraints(),
		lastName: lastNameConstraints(),
		username: usernameConstraints(),
		email: emailConstraints(),
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
		remember: z.boolean().optional(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export const ForgotPasswordSchema = z.object({
	email: emailConstraints(),
});

export const ResetPasswordSchema = z
	.object({
		password: passwordConstraints(),
		confirmPassword: passwordConstraints(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
