'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { APP_ROUTES } from '@/routes/APP';
import { type SearchUser, SearchUserSchema } from '@/validators/Search';

const SearchBar: React.FunctionComponent = (): React.ReactNode => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const form = useForm<SearchUser>({
		resolver: zodResolver(SearchUserSchema),
		defaultValues: {
			query: '',
		},
	});

	const onSubmit: SubmitHandler<SearchUser> = (data) => {
		const params = new URLSearchParams(searchParams);
		if (data.query) {
			params.set('query', data.query);
		} else {
			params.delete('query');
		}
		router.push(`${APP_ROUTES.SEARCH}?${params.toString()}`);
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				name='search-user-form'
				className='flex w-full flex-row gap-4'>
				<FormField
					control={form.control}
					name='query'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input
									type='text'
									placeholder='Search...'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					variant='default'
					size='icon'
					disabled={form.formState.isSubmitting}
					className='shrink-0'>
					{form.formState.isSubmitting ? (
						<Fragment>
							<Loader2 className='h-4 w-4 animate-spin' />
						</Fragment>
					) : (
						<Fragment>
							<Search className='h-4 w-4' />
						</Fragment>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
