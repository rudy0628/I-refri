import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { q } = req.query;

		const refrigeratorsQuery = searchPostsQuery(q);

		const refrigerators = await client.fetch(refrigeratorsQuery);

		res.status(200).json(refrigerators);
	}
}
