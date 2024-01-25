'use client';

import { LinkIcon, Unlink } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSearchUsers } from '@/hooks/useUsers';
import { APP_ROUTES } from '@/routes/APP';
import { getInitials } from '@/utils/get-initials';

type SearchUsersViewProps = {
	query: string;
};

const SearchUsersView: React.FunctionComponent<SearchUsersViewProps> = ({
	query,
}): React.ReactNode => {
	const { isLoading, isError, data: users, error } = useSearchUsers(query);
	const { data: session } = useSession();

	if (isLoading) return <div>Loading...</div>;

	if (isError) throw new Error(error.message);

	if (!users?.length) return <div>Users not found!</div>;

	return (
		<Fragment>
			<div className='flex w-full flex-col gap-4 py-2'>
				{users.map((user) => (
					<div
						key={user.id}
						className='flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-accent'>
						<Link
							href={`${APP_ROUTES.PROFILE}/${user.id}`}
							className='flex w-full flex-row items-center justify-start gap-x-2'>
							<Avatar>
								<AvatarImage
									src={user.profileImageURL}
									alt={`${user.firstName} ${user.lastName} Profile Image`}
								/>
								<AvatarFallback>
									{getInitials(user.firstName, user.lastName)}
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col items-start justify-between'>
								<span className='text-base font-medium'>
									{user.firstName} {user.lastName}
								</span>
								<span className='font-base text-xs text-muted-foreground'>
									@{user.userName}
								</span>
							</div>
						</Link>
						{session?.user.id === user.id ? null : (
							// TODO: Verify if is friend if so show disconnect button else show connect button
							<Fragment>
								<Button>
									<LinkIcon className='mr-2 h-4 w-4' />
									Connect
								</Button>
								<Button variant='outline'>
									<Unlink className='mr-2 h-4 w-4' />
									Disconnect
								</Button>
							</Fragment>
						)}
					</div>
				))}
			</div>
		</Fragment>
	);
};

export default SearchUsersView;
