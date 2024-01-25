import { z } from 'zod';

import {
	emailConstraints,
	maxLengthErrorMessage,
	minLengthErrorMessage,
	passwordConstraints,
} from './general';

export const NotificationsSchema = z.object({
	messages: z.boolean().default(true).optional(),
	connections: z.boolean().default(true).optional(),
});

export const LanguagesSchema = z.object({
	language: z.string(),
});

export const ChangeEmailSchema = z
	.object({
		currentEmail: emailConstraints(),
		newEmail: emailConstraints(),
		password: passwordConstraints(),
	})
	.refine(
		(data) => {
			return data.newEmail !== data.currentEmail;
		},
		{
			message: 'New email must be different from current email.',
			path: ['newEmail'],
		},
	);

export const ChangePasswordSchema = z
	.object({
		currentPassword: passwordConstraints(),
		newPassword: passwordConstraints(),
		confirmPassword: passwordConstraints(),
	})
	.refine(
		(data) => {
			return data.newPassword !== data.currentPassword;
		},
		{
			message: 'New password must be different from current password.',
			path: ['newPassword'],
		},
	)
	.refine(
		(data) => {
			return data.newPassword === data.confirmPassword;
		},
		{
			message: 'Passwords must match each other.',
			path: ['confirmPassword'],
		},
	);

export const DisableAccountSchema = z.object({
	reason: z
		.string()
		.trim()
		.min(3, { message: minLengthErrorMessage('Reason', 3) })
		.max(144, { message: maxLengthErrorMessage('Reason', 144) }),
	password: passwordConstraints(),
});

export type Notifications = z.infer<typeof NotificationsSchema>;
export type Languages = z.infer<typeof LanguagesSchema>;
export type ChangeEmail = z.infer<typeof ChangeEmailSchema>;
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
export type DisableAccount = z.infer<typeof DisableAccountSchema>;
