import { Schema, model } from 'mongoose';

const videoSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
		},
		description: {
			type: String,
			required: true,
			index: true,
		},
		thumbnailURL: {
			type: String,
			required: true,
		},
		publishedAt: {
			// different from createdAt
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default model('Video', videoSchema);
