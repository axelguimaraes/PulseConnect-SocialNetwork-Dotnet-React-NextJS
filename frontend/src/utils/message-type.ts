export const typeOfMessage = (message: string) => {
	const urlRegex = /(https?:\/\/[^\s]+)/;
	const fileExtensionMap: Record<string, string> = {
		'.jpg': 'photo',
		'.jpeg': 'photo',
		'.png': 'photo',
		'.gif': 'gif',
		'.mp4': 'video',
	};

	if (urlRegex.test(message)) {
		const fileExtension = message.match(/\.(jpg|jpeg|png|gif|mp4)$/i);

		if (fileExtension) {
			const extension = fileExtension[0].toLowerCase();
			const fileType = fileExtensionMap[extension];
			if (fileType) return `Sent you a ${fileType}`;
		}
	}

	return message;
};
