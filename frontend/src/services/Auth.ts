import { API_ROUTES } from '@/routes/api';
import { type SignInData, type SignUpData } from '@/types/Auth';

export const signIn = async (data: SignInData): Promise<Response> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.AUTH.LOGIN}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching user: ${response.status} ${response.statusText}`,
		);
	}

	return response;
};

export const signUp = async (data: SignUpData): Promise<Response> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.AUTH.REGISTER}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		throw new Error(
			`Error fetching user: ${response.status} ${response.statusText}`,
		);
	}

	return response;
};
