type TitleProps = {
	title: string;
};

const Title: React.FunctionComponent<TitleProps> = ({
	title,
}): React.ReactNode => {
	return <h1 className='py-1.5 text-xl font-bold tracking-tight'>{title}</h1>;
};

export default Title;
