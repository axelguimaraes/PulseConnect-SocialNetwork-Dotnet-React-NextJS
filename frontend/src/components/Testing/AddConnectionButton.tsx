'use client';

import { Link } from 'lucide-react';

import { Button } from '@/components/ui/button';

type AddConnectionButtonProps = {
	userId: string;
};

const AddConnectionButton: React.FunctionComponent<
	AddConnectionButtonProps
> = ({}): React.ReactNode => {
	// const { mutate, isPending } = useCreateConnection(userId);
	return (
		// <Button disabled={isPending} onClick={() => mutate(userId)}>
		<Button>
			{/* {isPending ? (
				<Fragment>
					<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					Connecting...
				</Fragment>
			) : (
				<Fragment>
					<Link className='mr-2 h-4 w-4' />
					Connect
				</Fragment>
			)} */}
			<Link className='mr-2 h-4 w-4' />
			Connect
		</Button>
	);
};

export default AddConnectionButton;
