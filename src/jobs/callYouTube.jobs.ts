import fs from 'fs';
import path from 'path';
import axios from 'axios';
import cron from 'node-cron';
import { exit } from 'process';

import youtubeConfig from '../config/youtube.config';
import TServerResponse from '../types/serverResponse.types';
import TGoogleVideoResponse from '../types/googleVidoeRespone.types';
import { saveMultipleVideos } from '../components/videos/dal.videos';

// To optimize, we could ask google to send GZIP compressed data to reduce the size of the response, but we would need to decompress it before saving it into the database. That makes the process a little compute intensive, but it would reduce the size of the response by 70%.
const callYouTube = async () => {
	const INTERVAL_TIME_IN_SECONDS = youtubeConfig.apiCallIntervalInSeconds; // interval time in seconds

	const API_KEYS = youtubeConfig.apiKeys; // array of google api keys
	const INITIAL_PUBLISHED_AFTER = youtubeConfig.initialPublishedAfter; // date in ISO format (YYYY-MM-DDThh:mm:ssZ) to get videos published after this date
	const SEARCH_QUERY = youtubeConfig.searchQuery; // search query to search for videos
	const MAX_RESULTS = youtubeConfig.maxResultsPerRequest; // number of videos we want to get from the api

	// checks if the file (last_published) exists and if it does, read the file and set the variable(LAST_PUBLISHED) to the value of the file. If it doesnt, set the variable to INITIAL_PUBLISHED_AFTER
	let LAST_PUBLISHED = fs.existsSync(path.join(__dirname, './last_published'))
		? fs.readFileSync(path.join(__dirname, './last_published'), 'utf-8')
		: INITIAL_PUBLISHED_AFTER;

	// cron schedule to run the function every 10 seconds
	cron.schedule(`*/${INTERVAL_TIME_IN_SECONDS} * * * * *`, async () => {
		try {
			const googleResponse = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&order=date&publishedAfter=${LAST_PUBLISHED}&key=${API_KEYS[0]}&maxResults=${MAX_RESULTS}`
			);

			const videoItems = googleResponse.data.items;

			if (!videoItems || !videoItems.length) {
				const responseObj: TServerResponse = {
					type: 'error',
					status: 404,
					message: 'No videos found',
					data: null,
					uniqueCode: 'NO_VIDEOS_FOUND',
				};
				return responseObj;
			}

			const videos = videoItems.map((item: TGoogleVideoResponse) => ({
				title: item.snippet.title || 'No title available',
				description: item.snippet.description || 'No description available',
				publishedAt: item.snippet.publishedAt,
				thumbnailURL:
					item.snippet.thumbnails.default.url || 'No thumbnail available',
			}));

			// save videos to db
			const savedVideos = await saveMultipleVideos(videos);
			if (savedVideos.type === 'error') {
				console.log('Error saving videos to db');
				return savedVideos;
			}

			LAST_PUBLISHED = videos[0]
				? videos[0].publishedAt
				: INITIAL_PUBLISHED_AFTER;

			// write the publishedAt date of the first video to the file (last_published)
			fs.writeFileSync(
				path.join(__dirname, './last_published'),
				LAST_PUBLISHED
			);

			const responseObj: TServerResponse = {
				type: 'success',
				status: 200,
				message: 'Videos saved successfully',
				data: savedVideos.data,
				uniqueCode: 'VIDEOS_SAVED_SUCCESSFULLY',
			};
			console.log('Videos saved successfully');
			return responseObj;
		} catch (err) {
			if (err instanceof Error) {
				console.log(
					'Quota exceeded / Invalid Key, trying again with a different api key'
				);

				// remove the first api key from the array and try again
				API_KEYS.shift();

				if (API_KEYS.length === 0) {
					console.log('No more api keys to try');
					exit(1);
				}

				const responseObj: TServerResponse = {
					type: 'error',
					status: 429,
					message:
						'Quota exceeded / Invalid Key, trying again with a different api key',
					data: null,
					uniqueCode: 'QUOTA_EXCEEDED',
				};
				return responseObj;
			}

			return err;
		}
	});
};

export default callYouTube;
