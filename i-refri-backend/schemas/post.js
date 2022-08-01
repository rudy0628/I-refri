export default {
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		{
			name: 'caption',
			title: 'Caption',
			type: 'string',
		},
		{
			name: 'refrigeration',
			title: 'Refrigeration',
			type: 'array',
			of: [{ type: 'item' }],
		},
		{
			name: 'freezing',
			title: 'Freezing',
			type: 'array',
			of: [{ type: 'item' }],
		},
		{
			name: 'userId',
			title: 'UserId',
			type: 'string',
		},
		{
			name: 'postedBy',
			title: 'PostedBy',
			type: 'postedBy',
		},
		{
			name: 'likes',
			title: 'Likes',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'user' }],
				},
			],
		},
		{
			name: 'date',
			title: 'Date',
			type: 'string',
		},
	],
};
