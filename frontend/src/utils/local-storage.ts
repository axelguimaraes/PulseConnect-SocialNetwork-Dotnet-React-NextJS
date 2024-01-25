const isLocalStorageSupported = (): boolean =>
	typeof localStorage !== 'undefined';

export const writeOnLocalStorage = <T>({
	key,
	data,
}: {
	key: string;
	data: T;
}): void => {
	if (!isLocalStorageSupported())
		throw new Error('Local Storage is not supported!');
	
	localStorage.setItem(key, JSON.stringify(data));
};

export const readFromLocalStorage = <T>({ key }: { key: string }): T | null => {
	if (!isLocalStorageSupported())
		throw new Error('Local Storage is not supported!');

	const storedData = localStorage.getItem(key);

	if (storedData) {
		return JSON.parse(storedData) as T;
	}

	return null;
};

export const removeFromLocalStorage = ({ key }: { key: string }): void => {
	if (!isLocalStorageSupported())
		throw new Error('Local Storage is not supported!');

	localStorage.removeItem(key);
};
