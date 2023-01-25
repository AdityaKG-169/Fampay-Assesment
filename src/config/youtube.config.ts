// The .env file contains YOUTUBE_API_KEYS=API_KEY_1, API_KEY_2, API_KEY_3. The API keys are separated by commas and spaces.
const apiKeysUnparsed = process.env.YOUTUBE_API_KEYS;

if (!apiKeysUnparsed) {
	throw new Error('No YouTube API keys found');
}

// Split the unparsed API keys into an array of strings (API keys) using the comma as the separator character (', ').
// Sample output: ['API_KEY_1', 'API_KEY_2', 'API_KEY_3'] (without the quotes '').
const apiKeys = apiKeysUnparsed.split(', ');

const youtubeConfig = {
	apiKeys,
	maxResultsPerRequest: 5, // The maximum number of results that can be returned in a single request.
	searchQuery: 'video', // The search query to use when searching for videos.
	initialPublishedAfter: '2023-01-01T00:00:00Z', // The date after which videos should be published. To avoid very old videos from the cache.
};

export default youtubeConfig;
