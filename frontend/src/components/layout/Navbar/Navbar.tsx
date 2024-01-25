import {
	ChevronDown,
	Contrast,
	Languages,
	LogOut,
	Settings,
	User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { APP_ROUTES } from '@/routes/APP';
import { getInitials } from '@/utils/get-initials';

import SearchBar from './SearchBar';
import ThemeButton from './ThemeButton';

const Navbar: React.FunctionComponent = async () => {
	const session = await getServerAuthSession();
	if (!session) throw new Error('Unauthenticated!');

	return (
		<header className='flex w-full flex-row items-center justify-between border-b border-border p-8'>
			<Link href={APP_ROUTES.APP}>
				<Image
					src='/assets/logo/Logo Transparent.svg'
					alt='Logo'
					width={128}
					height={40}
					priority={true}
					className='h-10 w-auto'
				/>
			</Link>
			<div className='hidden w-full max-w-sm flex-row items-center justify-between gap-x-2 md:flex'>
				<SearchBar />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className='flex cursor-pointer flex-row items-center justify-between gap-x-2'>
						<Avatar>
							<AvatarImage
								src={
									session.user.image
										? session.user.image
										: session.user.profileImageURL
								}
								alt='Profile Image'
							/>
							<AvatarFallback>
								{session.user.name
									? session.user.name
									: getInitials(
											session.user.firstName,
											session.user.lastName,
									  )}
							</AvatarFallback>
						</Avatar>
						<div className='hidden flex-col items-start justify-between md:flex'>
							<span className='text-base font-medium'>
								{session.user.name ? (
									session.user.name
								) : (
									<Fragment>
										{session.user.firstName}{' '}
										{session.user.lastName}
									</Fragment>
								)}
							</span>
							<div className='flex flex-row items-center justify-between gap-x-2'>
								<div className='h-3 w-3 rounded-full bg-emerald-500' />
								<span className='text-xs font-normal text-muted-foreground'>
									Online
								</span>
							</div>
						</div>
						<ChevronDown className='hidden h-5 w-5 md:flex' />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-48'>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								href={APP_ROUTES.PROFILE}
								className='flex w-full flex-row items-center justify-start'>
								<User className='mr-2 h-4 w-4' />
								Profile
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className='cursor-pointer'>
								<Contrast className='mr-2 h-4 w-4' />
								Appearance
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>
										<ThemeButton
											themeType='light'
											title='Light'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg=='
										/>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ThemeButton
											themeType='dark'
											title='Dark'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vb24iPjxwYXRoIGQ9Ik0xMiAzYTYgNiAwIDAgMCA5IDkgOSA5IDAgMSAxLTktOVoiLz48L3N2Zz4='
										/>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ThemeButton
											themeType='system'
											title='System'
											icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1bi1tb29uIj48cGF0aCBkPSJNMTIgOGEyLjgzIDIuODMgMCAwIDAgNCA0IDQgNCAwIDEgMS00LTQiLz48cGF0aCBkPSJNMTIgMnYyIi8+PHBhdGggZD0iTTEyIDIwdjIiLz48cGF0aCBkPSJtNC45IDQuOSAxLjQgMS40Ii8+PHBhdGggZD0ibTE3LjcgMTcuNyAxLjQgMS40Ii8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PHBhdGggZD0ibTYuMyAxNy43LTEuNCAxLjQiLz48cGF0aCBkPSJtMTkuMSA0LjktMS40IDEuNCIvPjwvc3ZnPg=='
										/>
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className='cursor-pointer'>
								<Languages className='mr-2 h-4 w-4' />
								Language
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem className='cursor-pointer'>
										English
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										Spanish
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										Portuguese
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								href={APP_ROUTES.SETTINGS.ROOT}
								className='flex w-full flex-row items-center justify-start'>
								<Settings className='mr-2 h-4 w-4' />
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								href={APP_ROUTES.AUTH.SIGN_OUT}
								className='flex w-full flex-row items-center justify-start'>
								<LogOut className='mr-2 h-4 w-4' />
								Sign Out
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Navbar;
