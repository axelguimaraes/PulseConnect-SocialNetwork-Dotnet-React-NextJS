'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Fragment, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { decrypt, encrypt } from '@/utils/cryptography';
import {
	readFromLocalStorage,
	removeFromLocalStorage,
	writeOnLocalStorage,
} from '@/utils/local-storage';
import { type SignIn, SignInSchema } from '@/validators/Auth';

const SignInForm: React.FunctionComponent = (): React.ReactNode => {
	const refCaptcha = useRef<ReCAPTCHA>(null);
	const searchParams = useSearchParams();

	const callbackUrl = searchParams.get('callbackUrl') ?? APP_ROUTES.APP;

	const form = useForm<SignIn>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			const storedData: {
				email: string;
				password: string;
				remember: boolean;
			} | null = readFromLocalStorage({ key: 'remember' });
			if (!storedData) return;
			const password = await decrypt(storedData.password);
			if (!password) return;
			form.setValue('email', storedData.email);
			form.setValue('password', password);
			form.setValue('remember', storedData.remember);
		};
		void fetchData();
	}, [form]);

	const onSubmit: SubmitHandler<SignIn> = async ({
		email,
		password,
		remember,
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

		const response = await signIn('credentials', {
			email,
			password,
			redirect: true,
			callbackUrl: callbackUrl,
		});

		if (!response?.ok) {
			form.setError('email', {
				type: 'custom',
				message: 'Invalid credentials',
			});
			form.setError('password', {
				type: 'custom',
				message: 'Invalid credentials',
			});
			form.setError('root', {
				type: 'custom',
				message: 'Invalid credentials',
			});
		}
	};

	const handleTwitterSignIn = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/externalAuth/twitter-callback`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		);

		console.log(response);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='sign-in-form'
				className='flex w-full flex-col gap-4'>
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
									autoComplete='current-password'
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
						href={APP_ROUTES.AUTH.FORGOT_PASSWORD}
						className='text-sm text-primary underline-offset-4 hover:underline'>
						Forgot your password?
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
				<Link
					href={APP_ROUTES.AUTH.SIGN_UP}
					className={`w-full ${buttonVariants({
						variant: 'secondary',
					})}`}>
					Create an account
				</Link>
				<Button
					type='button'
					variant='outline'
					className='w-full'
					onClick={() =>
						signIn('twitter', {
							redirect: true,
							callbackUrl: callbackUrl,
						})
					}>
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

export default SignInForm;
