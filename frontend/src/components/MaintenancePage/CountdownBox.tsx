type CountdownBoxProps = {
	value: number;
	label: string;
};

const CountdownBox: React.FunctionComponent<CountdownBoxProps> = ({
	value,
	label,
}): React.ReactNode => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-2'>
			<span className='flex h-16 w-16 flex-col items-center justify-center rounded-md bg-foreground text-xl font-medium text-background'>
				{String(value).padStart(2, '0')}
			</span>
			<span className='text-sm text-muted-foreground'>{label}</span>
		</div>
	);
};

export default CountdownBox;
