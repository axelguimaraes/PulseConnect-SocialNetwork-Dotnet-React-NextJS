import MobileSidebarItem from '@/components/layout/MobileSidebar/MobileSidebarItem';
import { type NavigationItemProps, navigationItems } from '@/data/navigation';

const MobileSidebar: React.FunctionComponent = (): React.ReactNode => {
	return (
		<aside className='flex h-min border-t border-border p-8 md:hidden'>
			<nav className='h-full w-full'>
				<ul className='flex h-full w-full flex-col items-start justify-between gap-8 sm:items-center'>
					{Object.keys(navigationItems).map(
						(categoty: string, index: number) => (
							<li
								key={`${categoty}-${index}`}
								className='flex w-full flex-row flex-wrap items-center justify-between gap-x-8 gap-y-4'>
								{navigationItems[categoty]?.map(
									(
										item: NavigationItemProps,
										index: number,
									) => (
										<MobileSidebarItem
											key={`${item.title}-${index}`}
											url={item.url}
											title={item.title}
											icon={item.icon}
										/>
									),
								)}
							</li>
						),
					)}
				</ul>
			</nav>
		</aside>
	);
};

export default MobileSidebar;
