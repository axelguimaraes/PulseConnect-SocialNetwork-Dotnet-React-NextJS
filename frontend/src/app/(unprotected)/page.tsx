import {
	ArrowRight,
	AtSign,
	ChevronRight,
	DollarSign,
	Facebook,
	Gitlab,
	Globe,
	Instagram,
	Linkedin,
	Lock,
	Mail,
	MapPin,
	MessageCircle,
	Twitter,
	Users,
	Youtube,
	Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type Metadata, type NextPage } from 'next/types';
import { Fragment } from 'react';

import { ContactForm } from '@/components/Forms';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { CONTACT_EMAIL } from '@/data/constants';
import { memberItems } from '@/data/members';
import { questionsItems } from '@/data/questions';
import { APP_ROUTES } from '@/routes/APP';
import { getInitials } from '@/utils/get-initials';

export const metadata: Metadata = {
	title: 'Pulse Connect - Homepage',
};

const LandingPage: NextPage = (): React.ReactNode => {
	return (
		<Fragment>
			<main className='relative h-screen'>
				<div className='absolute inset-0 -z-50 overflow-hidden'>
					<div className='jumbo absolute -inset-[10px] opacity-50'></div>
				</div>
				<div className='z-50 mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 sm:px-6 lg:px-8'>
					<section
						id='hero'
						className='flex h-screen w-full flex-col items-start justify-center'>
						<div className='flex w-full flex-col items-start justify-between gap-8'>
							<Image
								src='/assets/logo/Logo Transparent.svg'
								alt='Logo'
								width={48}
								height={48}
								className='h-12 w-12'
							/>
							<Link
								href={APP_ROUTES.APP}
								className='flex flex-row items-center justify-between gap-x-4'>
								<span className='rounded-full border border-primary bg-primary/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide'>
									What&apos;s new
								</span>
								<span className='flex flex-row items-center justify-between text-sm font-medium'>
									Just shipped v1.0.0
									<ChevronRight className='h-5 w-5' />
								</span>
							</Link>
							<div className='flex w-full max-w-lg flex-col items-start justify-between gap-y-4'>
								<h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>
									<span className='text-primary'>
										Pulse Connect
									</span>
									: Instant Networking, One Beat at a Time
								</h1>
								<p className='text-xl text-muted-foreground'>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Doloribus sapiente
									veritatis nobis dolores delectus, nesciunt
									iure praesentium ab ipsum.
								</p>
							</div>
							<div className='flex flex-row items-center justify-between gap-x-4'>
								<Link
									href={APP_ROUTES.APP}
									className={`max-w-fit ${buttonVariants({
										variant: 'default',
									})}`}>
									Get started
								</Link>
								<Link
									href={APP_ROUTES.APP}
									className={`max-w-fit ${buttonVariants({
										variant: 'ghost',
									})}`}>
									Learn more
									<ArrowRight className='ml-2 h-4 w-4' />
								</Link>
							</div>
						</div>
					</section>
					<section
						id='features'
						className='flex w-full flex-col items-start justify-center pb-64'>
						<div className='flex w-full flex-col items-start justify-between gap-16'>
							<h2 className='text-xl font-bold capitalize tracking-tight'>
								Features
							</h2>
							<div className='grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3'>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<AtSign className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Import existing contacts
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<Users className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Connect with new people
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<MessageCircle className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Chat in real-time
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<Zap className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Blazingly fast
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<DollarSign className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Free to use
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
								<div className='flex flex-row items-start justify-between gap-x-4'>
									<span className='rounded-md bg-primary p-2'>
										<Lock className='h-5 w-5' />
									</span>
									<div className='flex flex-col items-start justify-between gap-y-2'>
										<h3 className='text-lg font-semibold'>
											Secure and private
										</h3>
										<p className='text-base text-muted-foreground'>
											Lorem ipsum dolor sit amet,
											consectetur adipisicing elit.
											Doloribus sapiente veritatis nobis
											dolores delectus, nesciunt iure
											praesentium ab ipsum.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section
						id='stats'
						className='flex w-full flex-col items-start justify-center pb-64'>
						<div className='flex w-full flex-col items-start justify-between gap-16'>
							<h2 className='text-xl font-bold capitalize tracking-tight'>
								Our timeline
							</h2>
							<ol className='border-l border-border md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t'>
								<li className='flex flex-col gap-y-2'>
									<div className='flex-start flex items-center md:block md:pt-0'>
										<div className='-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary md:-mt-[5px] md:ml-0 md:mr-0'></div>
										<p className='text-sm text-primary md:mt-2'>
											Oct 2023
										</p>
									</div>
									<div className='ml-4 pb-5 md:ml-0'>
										<div className='flex flex-col gap-y-2'>
											<h4 className='text-xl font-semibold'>
												Started the project
											</h4>
											<p className='text-base text-muted-foreground'>
												Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
												Doloribus sapiente veritatis
												nobis dolores delectus, nesciunt
												iure praesentium ab ipsum.
											</p>
										</div>
									</div>
								</li>
								<li className='flex flex-col gap-y-2'>
									<div className='flex-start flex items-center md:block md:pt-0'>
										<div className='-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary md:-mt-[5px] md:ml-0 md:mr-0'></div>
										<p className='text-sm text-primary md:mt-2'>
											Dez 2023
										</p>
									</div>
									<div className='ml-4 pb-5 md:ml-0'>
										<div className='flex flex-col gap-y-2'>
											<h4 className='text-xl font-semibold'>
												Released beta
											</h4>
											<p className='text-base text-muted-foreground'>
												Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
												Doloribus sapiente veritatis
												nobis dolores delectus, nesciunt
												iure praesentium ab ipsum.
											</p>
										</div>
									</div>
								</li>
								<li className='flex flex-col gap-y-2'>
									<div className='flex-start flex items-center md:block md:pt-0'>
										<div className='-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-primary md:-mt-[5px] md:ml-0 md:mr-0'></div>
										<p className='text-sm text-primary md:mt-2'>
											Jan 2024
										</p>
									</div>
									<div className='ml-4 pb-5 md:ml-0'>
										<div className='flex flex-col gap-y-2'>
											<h4 className='text-xl font-semibold'>
												Global launch of product
											</h4>
											<p className='text-base text-muted-foreground'>
												Lorem ipsum dolor sit amet,
												consectetur adipisicing elit.
												Doloribus sapiente veritatis
												nobis dolores delectus, nesciunt
												iure praesentium ab ipsum.
											</p>
										</div>
									</div>
								</li>
							</ol>
						</div>
					</section>
					<section
						id='team'
						className='flex w-full flex-col items-start justify-center pb-64'>
						<div className='flex w-full flex-col items-start justify-between gap-16'>
							<div className='flex w-full flex-col items-start justify-between gap-4'>
								<h2 className='text-xl font-bold capitalize tracking-tight'>
									Our team
								</h2>
								<p className='max-w-3xl text-base font-normal leading-7'>
									We are a team of 5 people, with a lot of
									experience in the IT area, we have already
									developed several projects, both for
									companies and for ourselves.
								</p>
							</div>
							<div className='grid-col-1 grid w-full gap-12 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
								{memberItems.map(
									(memberItem, index: number) => (
										<div
											key={`${memberItem.email}-${index}`}
											className='flex flex-col items-center justify-center gap-y-4'>
											<a
												href={`mailto:${memberItem.email}?subject=Contact via about page.`}
												className='flex flex-col items-center justify-center gap-y-4'>
												<Avatar className='h-32 w-32'>
													<AvatarImage
														src={
															memberItem.imageURL
														}
														alt={`${memberItem.firstName} ${memberItem.lastName} Avatar`}
														className='bg-foreground object-cover object-top'
													/>
													<AvatarFallback>
														{getInitials(
															memberItem.firstName,
															memberItem.lastName,
														)}
													</AvatarFallback>
												</Avatar>
												<div className='flex flex-col items-center justify-between text-center'>
													<h4 className='text-2xl font-semibold'>
														{memberItem.firstName}{' '}
														{memberItem.lastName}
													</h4>
													<p className='text-base font-normal text-muted-foreground'>
														{memberItem.role}
													</p>
												</div>
											</a>
											<div className='flex flex-row items-center justify-between gap-x-4'>
												{memberItem.socials.map(
													(
														{ icon: Icon, url },
														index,
													) => (
														<a
															key={`${url}-${index}`}
															href={url}
															target='_blank'
															rel='noopener noreferrer'
															className='hover:text-primary'>
															<Icon className='h-4 w-4' />
														</a>
													),
												)}
											</div>
										</div>
									),
								)}
							</div>
						</div>
					</section>
					<section
						id='faq'
						className='flex w-full flex-col items-start justify-center pb-64'>
						<div className='flex w-full flex-col items-start justify-between gap-16'>
							<h2 className='text-xl font-bold capitalize tracking-tight'>
								Frequently asked questions
							</h2>
							<Accordion
								type='single'
								collapsible
								className='w-full'>
								{questionsItems.map((item, index: number) => {
									return (
										<AccordionItem
											key={`question-${index}`}
											value={`question-${index}`}>
											<AccordionTrigger>
												{item.question}
											</AccordionTrigger>
											<AccordionContent>
												{item.answer}
											</AccordionContent>
										</AccordionItem>
									);
								})}
							</Accordion>
						</div>
					</section>
					<section
						id='contact'
						className='flex w-full flex-col items-center justify-between pb-64'>
						<div className='flex w-full flex-col items-start justify-between gap-16 md:flex-row'>
							<div className='flex w-full flex-col items-start justify-start gap-y-8 md:w-1/2'>
								<h2 className='text-xl font-bold capitalize tracking-tight'>
									Contact us
								</h2>
								<p className='text-base font-normal leading-7 md:max-w-lg'>
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Doloribus sapiente
									veritatis nobis dolores delectus, nesciunt
									iure praesentium ab ipsum.
								</p>
								<div className='flex flex-col items-start justify-between gap-y-4'>
									<div className='flex flex-row items-center justify-between gap-x-2'>
										<MapPin className='h-4 w-4 text-primary' />
										<span className='text-sm text-muted-foreground'>
											R. do Curral, 4610-156 Felgueiras,
											Porto
										</span>
									</div>
									<div className='flex flex-row items-center justify-between gap-x-2'>
										<Mail className='h-4 w-4 text-primary' />
										<a
											href={`mailto:${CONTACT_EMAIL}?subject=Contact`}
											className='text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline'>
											{CONTACT_EMAIL}
										</a>
									</div>
								</div>
							</div>
							<ContactForm />
						</div>
					</section>
				</div>
				<div className='flex flex-col items-center justify-between gap-8'>
					<div className='flex flex-row items-center justify-between gap-x-8'>
						<a
							href=' https://www.facebook.com/estgpolitecnicodoporto'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Facebook className='h-5 w-5' />
						</a>
						<a
							href='https://www.instagram.com/estg_pporto'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Instagram className='h-5 w-5' />
						</a>
						<a
							href='https://www.linkedin.com/school/estg-ipp'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Linkedin className='h-5 w-5' />
						</a>
						<a
							href='https://twitter.com/estgpporto'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Twitter className='h-5 w-5' />
						</a>
						<a
							href='https://www.youtube.com/user/estgfipp'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Youtube className='h-5 w-5' />
						</a>
						<a
							href='https://gitlab.estg.ipp.pt/lds-2022-2023'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Gitlab className='h-5 w-5' />
						</a>
						<a
							href='https://www.estg.ipp.pt'
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-primary'>
							<Globe className='h-5 w-5' />
						</a>
					</div>
					<small className='text-xs text-muted-foreground'>
						Copyright &copy; {new Date().getFullYear()} Pulse
						Connect - All rights reserved.
					</small>
				</div>
			</main>
		</Fragment>
	);
};

export default LandingPage;
