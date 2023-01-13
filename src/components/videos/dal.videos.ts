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

export default {
	saveMultipleVideos,
};
