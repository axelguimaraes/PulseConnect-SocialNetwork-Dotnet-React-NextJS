'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HeartCrack, Loader2, X } from 'lucide-react';
import { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { reasons } from '@/data/reasons';
import {
	type DisableAccount,
	DisableAccountSchema,
} from '@/validators/Settings';

const DisableAccountForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<DisableAccount>({
		resolver: zodResolver(DisableAccountSchema),
		defaultValues: {
			reason: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<DisableAccount> = (data) => {
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
				name='disable-account-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='reason'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Reason</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								value={field.value}
								disabled={form.formState.isSubmitting}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a country' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='max-h-64 overflow-y-auto'>
									{reasons.map((reason, index: number) => (
										<SelectItem
											key={`${reason.value}-${index}`}
											value={reason.value}
											className='cursor-pointer'>
											{reason.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='current-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							variant='secondary'
							disabled={form.formState.isSubmitting}>
							<X className='mr-2 h-4 w-4' />
							Cancel
						</Button>
					</DialogClose>
					<Button
						type='submit'
						variant='destructive'
						disabled={form.formState.isSubmitting}
						className='max-w-min'>
						{form.formState.isSubmitting ? (
							<Fragment>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Updating...
							</Fragment>
						) : (
							<Fragment>
								<HeartCrack className='mr-2 h-4 w-4' />
								Disable
							</Fragment>
						)}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default DisableAccountForm;
