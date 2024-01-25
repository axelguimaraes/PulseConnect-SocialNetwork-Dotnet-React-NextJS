'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import { Fragment, useEffect } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { languages } from '@/data/languages';
import {
	readFromLocalStorage,
	writeOnLocalStorage,
} from '@/utils/local-storage';
import { type Languages, LanguagesSchema } from '@/validators/Settings';

const LanguagesForm: React.FunctionComponent = (): React.ReactNode => {
	const form = useForm<Languages>({
		resolver: zodResolver(LanguagesSchema),
		defaultValues: {
			language: '',
		},
	});

	useEffect(() => {
		const fetchData = () => {
			const storedData: {
				language: string;
			} | null = readFromLocalStorage({ key: 'language' });
			if (!storedData) return;
			form.setValue('language', storedData.language);
		};
		fetchData();
	}, [form]);

	const onSubmit: SubmitHandler<Languages> = (data) => {
		writeOnLocalStorage({
			key: 'language',
			data: {
				language: data.language,
			},
		});

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
				name='languages-form'
				className='flex w-full flex-col gap-4'>
				<FormField
					control={form.control}
					name='language'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								value={field.value}
								disabled={form.formState.isSubmitting}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a language' />
									</SelectTrigger>
								</FormControl>
								<SelectContent className='max-h-64 overflow-y-auto'>
									{languages.map(
										(language, index: number) => (
											<SelectItem
												key={`${language.value}-${index}`}
												value={language.value}
												className='cursor-pointer'>
												{language.label}
											</SelectItem>
										),
									)}
								</SelectContent>
							</Select>
							<FormMessage />
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

export default LanguagesForm;
