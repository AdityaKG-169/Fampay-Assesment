type TGoogleVideoResponse = {
	snippet: {
		title: string;
		description: string;
		publishedAt: string;
		thumbnails: { default: { url: string } };
	};
};

export default TGoogleVideoResponse;
