export type User = {
	id: string;
	email: string;
	password: string;
	userName: string;
	firstName: string;
	lastName: string;
	profileImageURL: string;
	headerImageURL: string;
	bio: string;
	city: string;
	country: string;
	customURL: string;
	createdAt: string;
	connectionsTotal: number;
	accessToken: string;
};

export type Users = User[];
