export type Message = {
	id: string;
	userId: string;
	userName: string;
	firstName: string;
	lastName: string;
	lastMessage: string;
	profileImageURL: string;
	createdAt: string;
	isRead: boolean;
};

export type Messages = Message[];
