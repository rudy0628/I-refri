import type { NextApiRequest, NextApiResponse } from 'next';

import { postDetailQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { id } = req.query;
		const query = postDetailQuery(id);

		const data = await client.fetch(query);

		res.status(200).json(data[0]);
	}

	if (req.method === 'PUT') {
		const { postId, refrigeration, freezing } = req.body;

		await client
			.patch(postId)
			.set({ refrigeration: refrigeration, freezing: freezing })
			.commit();
		res.status(201).json('Update post succeed!');
	}
}
