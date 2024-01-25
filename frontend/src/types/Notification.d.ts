export type Notification = {
	id: string;
	userId: string;
	userName: string;
	firstName: string;
	lastName: string;
	message: string;
	profileImageURL: string;
	createdAt: string;
	isRead: boolean;
};

export type NotificationTotal = {
	total: number;
};

export type Notifications = Notification[];
