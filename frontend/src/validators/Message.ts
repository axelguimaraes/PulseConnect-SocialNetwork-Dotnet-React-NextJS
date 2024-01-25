import { z } from 'zod';

export const MessageSchema = z.object({
	message: z.string().min(1).max(144),
});

export type Message = z.infer<typeof MessageSchema>;
