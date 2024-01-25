const Footer: React.FunctionComponent = (): React.ReactNode => {
	return (
		<small className='flex w-full flex-row items-center justify-center border-t border-input p-1.5 text-xs text-muted-foreground'>
			Copyright &copy; {new Date().getFullYear()} Pulse Connect - All
			rights reserved.
		</small>
	);
};

export default Footer;
