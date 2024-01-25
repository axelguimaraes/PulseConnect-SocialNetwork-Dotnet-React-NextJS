export type FilterProps = {
	sort: string;
	order: string;
	label: string;
	icon: string;
};

export const filters: FilterProps[] = [
	{
		sort: 'name',
		order: 'asc',
		label: 'A to Z',
		icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24tYS16Ij48cGF0aCBkPSJtMyAxNiA0IDQgNC00Ii8+PHBhdGggZD0iTTcgMjBWNCIvPjxwYXRoIGQ9Ik0yMCA4aC01Ii8+PHBhdGggZD0iTTE1IDEwVjYuNWEyLjUgMi41IDAgMCAxIDUgMFYxMCIvPjxwYXRoIGQ9Ik0xNSAxNGg1bC01IDZoNSIvPjwvc3ZnPg==',
	},
	{
		sort: 'name',
		order: 'desc',
		label: 'Z to A',
		icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24tei1hIj48cGF0aCBkPSJtMyAxNiA0IDQgNC00Ii8+PHBhdGggZD0iTTcgNHYxNiIvPjxwYXRoIGQ9Ik0xNSA0aDVsLTUgNmg1Ii8+PHBhdGggZD0iTTE1IDIwdi0zLjVhMi41IDIuNSAwIDAgMSA1IDBWMjAiLz48cGF0aCBkPSJNMjAgMThoLTUiLz48L3N2Zz4=',
	},
	{
		sort: 'time',
		order: 'desc',
		label: 'Newest',
		icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24tMC0xIj48cGF0aCBkPSJtMyAxNiA0IDQgNC00Ii8+PHBhdGggZD0iTTcgMjBWNCIvPjxyZWN0IHg9IjE1IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI2IiByeT0iMiIvPjxwYXRoIGQ9Ik0xNyAyMHYtNmgtMiIvPjxwYXRoIGQ9Ik0xNSAyMGg0Ii8+PC9zdmc+',
	},
	{
		sort: 'time',
		order: 'asc',
		label: 'Oldest',
		icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWFycm93LWRvd24tMS0wIj48cGF0aCBkPSJtMyAxNiA0IDQgNC00Ii8+PHBhdGggZD0iTTcgMjBWNCIvPjxwYXRoIGQ9Ik0xNyAxMFY0aC0yIi8+PHBhdGggZD0iTTE1IDEwaDQiLz48cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSI0IiBoZWlnaHQ9IjYiIHJ5PSIyIi8+PC9zdmc+',
	},
];