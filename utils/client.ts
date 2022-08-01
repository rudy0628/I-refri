import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: '3iwkoch2',
	dataset: 'production',
	apiVersion: '2022-07-25',
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
