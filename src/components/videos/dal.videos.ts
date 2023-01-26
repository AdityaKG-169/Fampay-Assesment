import Video from './model.videos';
import TVideo from '../../types/video.types';
import TServerResponse from '../../types/serverResponse.types';

// Save multiple videos to the database.
const saveMultipleVideos = async (videos: TVideo[]) => {
	try {
		const savedVideos = await Video.insertMany(videos);
		if (savedVideos) {
			const responseObject: TServerResponse = {
				type: 'success',
				status: 200,
				message: 'Videos saved successfully',
				data: savedVideos,
				uniqueCode: 'VIDEOS_SAVED',
			};
			return responseObject;
		}

		const responseObject: TServerResponse = {
			type: 'error',
			status: 500,
			message: 'Internal server error (saveMultipleVideos)',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
		return responseObject;
	} catch (error) {
		console.log(error);
		const responseObject: TServerResponse = {
			type: 'error',
			status: 500,
			message: 'Internal server error (saveMultipleVideos)',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
		return responseObject;
	}
};

// Returns the stored video data in a paginated response sorted in descending order of publishedAt.
// Page number starts from 1.
// sortBy: asc or desc
const getPaginatedVideos = async (
	page: number | undefined,
	sortBy: string | undefined
) => {
	try {
		const limit = 10;

		let finalSortBy = 'desc';
		if (sortBy === 'asc' || sortBy === 'desc') finalSortBy = sortBy;

		let finalPageNumber = 1;
		if (page && page >= 1) finalPageNumber = page;

		const videos = await Video.find()
			.sort({ publishedAt: finalSortBy === 'asc' ? 1 : -1 })
			.skip((finalPageNumber - 1) * limit)
			.limit(limit)
			.select('-__v -_id -createdAt -updatedAt -confidenceScore')
			.exec();

		if (videos && videos.length > 0) {
			const responseObject: TServerResponse = {
				type: 'success',
				status: 200,
				message: 'Videos fetched successfully',
				data: videos,
				uniqueCode: 'VIDEOS_FETCHED',
			};
			return responseObject;
		}

		const responseObject: TServerResponse = {
			type: 'error',
			status: 404,
			message: 'Videos not found',
			data: null,
			uniqueCode: 'VIDEOS_NOT_FOUND',
		};

		return responseObject;
	} catch (error) {
		const responseObject: TServerResponse = {
			type: 'error',
			status: 500,
			message: 'Internal server error (getPaginatedVideos)',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
		return responseObject;
	}
};

// Function to return the video whose title or description matches the search query.
// Page number starts from 1.
// sortBy: asc or desc
const searchVideos = async (
	query: string | undefined,
	page: number | undefined,
	sortBy: string | undefined
) => {
	try {
		const limit = 10;

		let finalSortBy = 'desc';
		if (sortBy === 'asc' || sortBy === 'desc') finalSortBy = sortBy;

		let finalPageNumber = 1;
		if (page && page >= 1) finalPageNumber = page;

		if (!query || !query.trim()) {
			const responseObject: TServerResponse = {
				type: 'error',
				status: 400,
				message: 'Invalid search query',
				data: null,

				uniqueCode: 'INVALID_SEARCH_QUERY',
			};
			return responseObject;
		}

		const modifiedQuery = query.trim();

		const videos = await Video.fuzzySearch(modifiedQuery)
			.sort({ publishedAt: finalSortBy === 'asc' ? 1 : -1 })
			.skip((finalPageNumber - 1) * limit)
			.limit(limit)
			.select('-__v -_id -createdAt -updatedAt -confidenceScore')
			.exec();

		if (videos && videos.length > 0) {
			const responseObject: TServerResponse = {
				type: 'success',
				status: 200,
				message: 'Videos fetched successfully',
				data: videos,
				uniqueCode: 'VIDEOS_FETCHED',
			};
			return responseObject;
		}

		const responseObject: TServerResponse = {
			type: 'error',
			status: 404,
			message: 'Videos not found',
			data: null,
			uniqueCode: 'VIDEOS_NOT_FOUND',
		};

		return responseObject;
	} catch (error) {
		const responseObject: TServerResponse = {
			type: 'error',
			status: 500,
			message: 'Internal server error (searchVideos)',
			data: null,
			uniqueCode: 'INTERNAL_SERVER_ERROR',
		};
		return responseObject;
	}
};

export { saveMultipleVideos, getPaginatedVideos, searchVideos };
