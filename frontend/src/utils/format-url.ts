export const formatURL = (url: string): string => {
	if (url == null) {
		return ""
	}
	return url.replace(/^https?:\/\//, '');
};
