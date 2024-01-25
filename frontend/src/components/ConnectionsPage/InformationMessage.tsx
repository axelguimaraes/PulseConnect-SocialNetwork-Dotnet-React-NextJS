type InformationMessageProps = {
	title: string;
	message: string;
};

const InformationMessage: React.FunctionComponent<InformationMessageProps> = ({
	title,
	message,
}): React.ReactNode => {
	return (
		<div className='flex flex-col items-center justify-between gap-y-4'>
			<h2 className='text-3xl font-semibold tracking-tight'>{title}</h2>
			<p className='max-w-3xl text-base font-normal leading-7'>
				{message}
			</p>
		</div>
	);
};

export default InformationMessage;
