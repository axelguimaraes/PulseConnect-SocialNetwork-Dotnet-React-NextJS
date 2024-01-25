export type ReasonsItemProps = {
	label: string;
	value: string;
};

export const reasons: ReasonsItemProps[] = [
	{
		label: 'Unsatisfactory user experience',
		value: 'unsatisfactory_experience',
	},
	{ label: 'No longer using the service', value: 'no_longer_using' },
	{ label: 'Technical difficulties', value: 'technical_difficulties' },
	{ label: 'Privacy concerns', value: 'privacy_concerns' },
	{ label: 'Account security issues', value: 'security_issues' },
	{ label: 'Other reasons', value: 'other' },
];
