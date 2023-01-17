import { Schema, model } from 'mongoose';
import mongooseFuzzySearching from 'mongoose-fuzzy-searching';

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

videoSchema.plugin(mongooseFuzzySearching, {
	fields: ['title', 'description'],
});

export default model('Video', videoSchema);
