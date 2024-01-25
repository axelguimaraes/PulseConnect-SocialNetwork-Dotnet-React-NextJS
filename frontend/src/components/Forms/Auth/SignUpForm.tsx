'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Twitter } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Fragment, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { APP_ROUTES } from '@/routes/APP';
import { signUp } from '@/services/Auth';
import { encrypt } from '@/utils/cryptography';
import {
	removeFromLocalStorage,
	writeOnLocalStorage,
} from '@/utils/local-storage';
import { type SignUp, SignUpSchema } from '@/validators/Auth';

const SignUpForm: React.FunctionComponent = (): React.ReactNode => {
	const refCaptcha = useRef<ReCAPTCHA>(null);

	const form = useForm<SignUp>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			remember: false,
		},
	});

	const onSubmit: SubmitHandler<SignUp> = async ({
		firstName,
		lastName,
		username,
		email,
		password,
		remember,
		confirmPassword
	}) => {
		if (!remember) removeFromLocalStorage({ key: 'remember' });
		else {
			const encryptedPassword = await encrypt(password);
			if (!encryptedPassword) return;
			writeOnLocalStorage({
				key: 'remember',
				data: {
					email,
					password: encryptedPassword,
					remember,
				},
			});
		}
		console.log(firstName, lastName, username, email, password, remember)

		const response = await signUp({
			firstName,
			lastName,
			username,
			email,
			password,
			confirmPassword
		});

		if (!response.ok) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem signing up.',
			});
			return;
		}

		await signIn('credentials', {
			email,
			password,
			redirect: true,
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='sign-up-form'
				className='flex w-full flex-col gap-4'>
				<div className='flex flex-row justify-between gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						disabled={form.formState.isSubmitting}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Pulse'
										autoComplete='given-name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						disabled={form.formState.isSubmitting}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Connect'
										autoComplete='family-name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='username'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									type='text'
									placeholder='PulseConnect'
									autoComplete='username'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='user@pulseconnect.com'
									autoComplete='email'
									{...field}
								/>
							</FormControl>
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
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					disabled={form.formState.isSubmitting}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='********'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
					<FormField
						control={form.control}
						name='remember'
						render={({ field }) => (
							<FormItem className='flex flex-row gap-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={form.formState.isSubmitting}
									/>
								</FormControl>
								<FormLabel>Remember me</FormLabel>
							</FormItem>
						)}
					/>
					<Link
						href={APP_ROUTES.AUTH.SIGN_IN}
						className='text-sm text-primary underline-offset-4 hover:underline'>
						Already have an account?
					</Link>
				</div>
				<Button
					type='submit'
					className='w-full'
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Submitting...
						</Fragment>
					) : (
						<Fragment>Submit</Fragment>
					)}
				</Button>
				<Separator />
				<Button type='button' variant='outline' className='w-full'>
					<Twitter className='mr-2 h-4 w-4' />
					Continue with Twitter
				</Button>
				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
					ref={refCaptcha}
					size='invisible'
					hidden={true}
				/>
			</form>
		</Form>
	);
};

export default SignUpForm;
