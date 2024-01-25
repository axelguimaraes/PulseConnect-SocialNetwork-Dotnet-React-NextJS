import {
	readFromLocalStorage,
	writeOnLocalStorage,
} from '@/utils/local-storage';

const isCryptoSupported = (): boolean => typeof crypto !== 'undefined';

const generateEncryptionKey = async (): Promise<CryptoKey | null> => {
	if (!isCryptoSupported())
		throw new Error('Web Crypto API is not supported!');

	return crypto.subtle.generateKey(
		{
			name: 'AES-GCM',
			length: 256,
		},
		true,
		['encrypt', 'decrypt'],
	);
};

const generateIV = (): Uint8Array | null => {
	if (!isCryptoSupported())
		throw new Error('Web Crypto API is not supported!');

	return crypto.getRandomValues(new Uint8Array(12));
};

const importKey = (keyData: Uint8Array): Promise<CryptoKey | null> => {
	if (!isCryptoSupported())
		throw new Error('Web Crypto API is not supported!');

	return crypto.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, [
		'decrypt',
	]);
};

export const encrypt = async (plainText: string): Promise<string | null> => {
	if (!isCryptoSupported())
		throw new Error('Web Crypto API is not supported!');

	const encryptionKey = await generateEncryptionKey();
	const iv = generateIV();

	if (!encryptionKey || !iv)
		throw new Error('Failed to generate encryption key or IV!');

	const data = new TextEncoder().encode(plainText);

	const encryptedData = await crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		encryptionKey,
		data,
	);

	const keyData = await window.crypto.subtle.exportKey('raw', encryptionKey);
	const keyBase64 = btoa(
		String.fromCharCode.apply(null, Array.from(new Uint8Array(keyData))),
	);
	const ivBase64 = btoa(String.fromCharCode.apply(null, Array.from(iv)));

	writeOnLocalStorage({ key: 'encryptionKey', data: keyBase64 });
	writeOnLocalStorage({ key: 'encryptionIV', data: ivBase64 });

	return btoa(
		String.fromCharCode.apply(
			null,
			Array.from(new Uint8Array(encryptedData)),
		),
	);
};

export const decrypt = async (
	encryptedData: string,
): Promise<string | null> => {
	if (!isCryptoSupported())
		throw new Error('Web Crypto API is not supported!');

	const keyBase64: string = readFromLocalStorage({ key: 'encryptionKey' })!;
	const ivBase64: string = readFromLocalStorage({ key: 'encryptionIV' })!;

	if (!keyBase64 || !ivBase64) {
		throw new Error(
			'Failed to retrieve encryption key or IV from local storage!',
		);
	}

	const keyData = new Uint8Array(
		Array.from(atob(keyBase64), (c) => c.charCodeAt(0)),
	);
	const iv = new Uint8Array(
		Array.from(atob(ivBase64), (c) => c.charCodeAt(0)),
	);
	const encryptedBytes = new Uint8Array(
		Array.from(atob(encryptedData), (c) => c.charCodeAt(0)),
	);

	const encryptionKey = await importKey(keyData);

	if (!encryptionKey) {
		throw new Error('Failed to import encryption key!');
	}

	const decryptedData = await crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		encryptionKey,
		encryptedBytes,
	);

	return new TextDecoder().decode(decryptedData);
};
