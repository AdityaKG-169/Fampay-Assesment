import { Request, Response } from 'express';

import { searchVideos, getPaginatedVideos } from './dal.videos';

interface IQueryAndRequest extends Request {
	query: {
		query: string | undefined;
		page: string | undefined;
		sortBy: 'asc' | 'desc' | undefined;
	};
}

const getPaginatedVideosController = async (
	req: IQueryAndRequest,
	res: Response
) => {
	const { page, sortBy, query } = req.query;

	if (!query || !query.trim()) {
		const paginatedVideos = await getPaginatedVideos(
			parseInt(page as string, 10),
			sortBy as string
		);

		return res.status(paginatedVideos.status).json(paginatedVideos);
	}

	const searchResults = await searchVideos(
		query,
		parseInt(page as string, 10),
		sortBy as string
	);

	return res.status(searchResults.status).json(searchResults);
};

export default getPaginatedVideosController;
