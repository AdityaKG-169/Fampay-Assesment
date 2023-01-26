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

	// if we dont have a query, we return paginated videos
	if (!query || !query.trim()) {
		const paginatedVideos = await getPaginatedVideos(
			page ? parseInt(page as string, 10) : undefined,
			sortBy
		);

		return res.status(paginatedVideos.status).json(paginatedVideos);
	}

	// if we have a query, we return search results
	const searchResults = await searchVideos(
		query,
		page ? parseInt(page as string, 10) : undefined,
		sortBy
	);

	return res.status(searchResults.status).json(searchResults);
};

export default getPaginatedVideosController;
