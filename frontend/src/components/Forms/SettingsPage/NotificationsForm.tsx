'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { type Notifications, NotificationsSchema } from '@/validators/Settings';

const NotificationsForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<Notifications>({
		resolver: zodResolver(NotificationsSchema),
		// TODO: Fetch user notifications settings from API
		defaultValues: {
			messages: true,
			connections: true,
		},
	});

	const onSubmit: SubmitHandler<Notifications> = (data) => {
		// TODO: Call API to update user profile info
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				toast({
					title: 'You submitted the following values:',
					description: (
						<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
							<code className='text-white'>
								{JSON.stringify(data, null, 2)}
							</code>
						</pre>
					),
				});
				resolve();
			}, 5000);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='notifications-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='messages'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center justify-between rounded-md border p-4'>
							<div className='flex flex-col items-start justify-center'>
								<FormLabel>Messages</FormLabel>
								<FormDescription>
									Receive notifications about new messages
									your connections have sent you.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='connections'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center justify-between rounded-md border p-4'>
							<div className='flex flex-col items-start justify-center'>
								<FormLabel>Connections</FormLabel>
								<FormDescription>
									Receive notifications about new connections
									made.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
									disabled={form.formState.isSubmitting}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					disabled={form.formState.isSubmitting}
					className='max-w-min'>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Updating...
						</Fragment>
					) : (
						<Fragment>
							<Save className='mr-2 h-4 w-4' />
							Save
						</Fragment>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default NotificationsForm;
