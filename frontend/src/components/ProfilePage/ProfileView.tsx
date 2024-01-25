'use client';

import {
	CalendarDays,
	Link as LinkIcon,
	Mail,
	MapPin,
	Pencil,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { EditProfileForm } from '@/components/Forms';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useGetUser } from '@/hooks/useUsers';
import { APP_ROUTES } from '@/routes/APP';
import { formatJoinDate } from '@/utils/format-join-date';
import { formatNumber } from '@/utils/format-number';
import { formatURL } from '@/utils/format-url';
import { getInitials } from '@/utils/get-initials';
import { truncateText } from '@/utils/truncate-text';

import AddConnectionButton from '../Testing/AddConnectionButton';
import MessageButton from '../Testing/MessageButton';
import MoreOptionsButton from '../Testing/MoreOptionsButton';
import RemoveConnectionButton from '../Testing/RemoveConnectionButton';
import ProfileSkeleton from './ProfileSkeleton';

type ProfileViewProps = {
	userId: string;
};

const ProfileView: React.FunctionComponent<ProfileViewProps> = ({
	userId,
}): React.ReactNode => {
	const { isLoading, isError, data: user, error } = useGetUser(userId);
	const { data: session } = useSession();

	console.log("User: ", user)
	console.log("Created at: ", user?.createdAt)

	if (isLoading) return <ProfileSkeleton />;

	if (isError) throw new Error(error.message);

	if (!user) return <div>User not found!</div>;

	const isOwner = session?.user.id === userId;

	return (
		<Fragment>
			<div className='relative w-full'>
				<Dialog>
					<DialogTrigger asChild className='w-full'>
						<Image
							src={user.headerImageURL}
							alt='Header Image'
							width={1500}
							height={500}
							className='relative h-64 w-full cursor-pointer rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{user.firstName} {user.lastName}
							</DialogTitle>
							<DialogDescription>Header Image</DialogDescription>
						</DialogHeader>
						<Image
							src={user.headerImageURL}
							alt='Header Image'
							width={1500}
							height={500}
							className='h-auto w-full rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger asChild className='w-full'>
						<Avatar className='absolute bottom-0 left-8 h-32 w-32 translate-y-16 transform cursor-pointer shadow-md'>
							<AvatarImage
								src={user.profileImageURL}
								alt='Profile Image'
								className='object-cover object-center'
							/>
							<AvatarFallback>
								{getInitials(user.firstName, user.lastName)}
							</AvatarFallback>
						</Avatar>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{user.firstName} {user.lastName}
							</DialogTitle>
							<DialogDescription>Profile Image</DialogDescription>
						</DialogHeader>
						<Image
							src={user.profileImageURL}
							alt='Profile Image'
							width={256}
							height={256}
							className='h-auto w-full rounded-md object-cover object-center'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUVFX5DwACZAFzjE95IwAAAABJRU5ErkJggg=='
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Close
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div className='mt-16 flex w-full flex-col gap-4'>
				<div className='flex flex-row flex-wrap items-center justify-between gap-4'>
					<div className='flex flex-col'>
						<h2 className='text-xl font-bold'>
							{user.firstName} {user.lastName}
						</h2>
						<span className='text-sm text-muted-foreground'>
							@{user.userName}
						</span>
					</div>
					<div className='flex flex-row justify-between gap-x-2'>
						{isOwner ? (
							<Fragment>
								<Dialog>
									<DialogTrigger asChild>
										<Button>
											<Pencil className='mr-2 h-4 w-4' />
											Edit Profile
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												Edit Profile
											</DialogTitle>
											<DialogDescription>
												Make changes to your profile
												here. Click save when
												you&apos;re done.
											</DialogDescription>
										</DialogHeader>
										<EditProfileForm userId={user.id} />
									</DialogContent>
								</Dialog>
							</Fragment>
						) : (
							<Fragment>
								<MoreOptionsButton
									userId={user.id}
									userName={user.userName}
								/>
								<MessageButton userId={user.id} />
								<AddConnectionButton userId={user.id} />
								<RemoveConnectionButton userId={user.id} />
							</Fragment>
						)}
					</div>
				</div>
				<p className='w-full text-base font-normal lg:w-3/4'>
					{truncateText(user.bio, 144)}
				</p>
				<div className='flex flex-col gap-y-1'>
					<div className='flex flex-row gap-x-4'>
						{user.city !== null && user.country !== null ? (
							<div className='flex flex-row items-center gap-x-2'>
								<MapPin className='h-4 w-4 text-muted-foreground' />
								<span className='text-sm text-muted-foreground'>
									{user.city}, {user.country}
								</span>
							</div>
						) : null}
						<div className='flex flex-row items-center gap-x-2'>
							<CalendarDays className='h-4 w-4 text-muted-foreground' />
							<span className='text-sm text-muted-foreground'>
								Joined in {formatJoinDate(user.createdAt)}
							</span>
						</div>
					</div>
					<div className='flex flex-row gap-x-4'>
						<div className='flex flex-row items-center gap-x-2'>
							<Mail className='h-4 w-4 text-muted-foreground' />
							<a
								href={`mailto:${user.email}?subject=Contact by profile page at Pulse Connect.`}
								className='text-sm text-primary underline-offset-4 hover:underline'>
								{user.email.toLowerCase()}
							</a>
						</div>
						{user.customURL && user.customURL.trim() !== '' && (
							<div className='flex flex-row items-center gap-x-2'>
								<LinkIcon className='h-4 w-4 text-muted-foreground' />
								<a
									href={user.customURL}
									target='_blank'
									className='text-sm text-primary underline-offset-4 hover:underline'
								>
									{formatURL(user.customURL)}
								</a>
							</div>
						)}
					</div>
					<div className='flex flex-row items-center gap-x-2'>
						<Link
							href={`${APP_ROUTES.PROFILE_CONNECTIONS(user.id)}`}
							className='underline-offset-4 hover:text-primary hover:underline'>
							<span className='text-sm font-bold'>
								{formatNumber(user.connectionsTotal)}
							</span>
						</Link>
						<span className='text-sm text-muted-foreground'>
							Connections
						</span>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileView;
