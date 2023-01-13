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
const getPaginatedVideos = async (page: number) => {
	try {
		const limit = 10;

		const videos = await Video.find()
			.sort({ publishedAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
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
const searchVideos = async (query: string, page: number) => {
	try {
		const limit = 10;

		const videos = await Video.find({
			$or: [
				{ title: { $regex: query, $options: 'i' } }, // i for case insensitive
				{ description: { $regex: query, $options: 'i' } },
			],
		})
			.sort({ publishedAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
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
