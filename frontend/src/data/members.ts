import { Globe, Linkedin, type LucideIcon } from 'lucide-react';

export type MemberItemProps = {
	email: string;
	imageURL: string;
	firstName: string;
	lastName: string;
	role: string;
	socials: { icon: LucideIcon; url: string }[];
};

export const memberItems: MemberItemProps[] = [
	{
		email: '8200378@estg.ipp.pt',
		imageURL: '/assets/images/team/Daniel.svg',
		firstName: 'Daniel',
		lastName: 'Teixeira',
		role: 'CTO / CCB',
		socials: [
			{
				icon: Linkedin,
				url: 'https://www.linkedin.com/in/daniel-fr-teixeira/',
			},
			{
				icon: Globe,
				url: '#',
			},
		],
	},
	{
		email: '8200441@estg.ipp.pt',
		imageURL: '/assets/images/team/Hugo.svg',
		firstName: 'Hugo',
		lastName: 'Ribeiro',
		role: 'Scrum Master',
		socials: [
			{
				icon: Linkedin,
				url: 'https://www.linkedin.com/in/hugo-ribeiro-03a38628a/',
			},
			{
				icon: Globe,
				url: '#',
			},
		],
	},
	{
		email: '8180657@estg.ipp.pt',
		imageURL: '/assets/images/team/Axel.svg',
		firstName: 'Axel',
		lastName: 'Guimarães',
		role: 'Senior Developer',
		socials: [
			{
				icon: Linkedin,
				url: 'https://www.linkedin.com/in/axel-guimaraes/',
			},
			{
				icon: Globe,
				url: '#',
			},
		],
	},
	{
		email: '8200408@estg.ipp.pt',
		imageURL: '/assets/images/team/Marcio.svg',
		firstName: 'Márcio',
		lastName: 'Ribeiro',
		role: 'Back-end Developer',
		socials: [
			{
				icon: Linkedin,
				url: 'https://www.linkedin.com/in/m%C3%A1rcio-samuel-santos-ribeiro-838372298/',
			},
			{
				icon: Globe,
				url: '#',
			},
		],
	},
	{
		email: '8200615@estg.ipp.pt',
		imageURL: '/assets/images/team/Sergio.svg',
		firstName: 'Sérgio',
		lastName: 'Félix',
		role: 'Front-end Developer',
		socials: [
			{
				icon: Linkedin,
				url: 'https://www.linkedin.com/in/sergiofelixdev/',
			},
			{
				icon: Globe,
				url: 'https://wallq.github.io/Portfolio/',
			},
		],
	},
];
