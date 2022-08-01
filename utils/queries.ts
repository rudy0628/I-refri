export const allPostsQuery = () => {
	const query = `*[_type == "post"] | order(_createdAt desc) {
		_id,
		caption,
		userId,
		postedBy->{
			_id,
			userName,
			image,
			email
		},
		likes,
		refrigeration[] {
			_key,
			title,
			expiration
		},
		freezing[] {
			_key,
			title,
			expiration
		},
		date
	}`;

	return query;
};

export const postDetailQuery = (postId: string | string[]) => {
	const query = `*[_type == "post" && _id == '${postId}'] {
		_id,
		caption,
		userId,
		postedBy->{
			_id,
			userName,
			image,
			email
		},
		likes,
		refrigeration[] {
			_key,
			title,
			expiration
		},
		freezing[] {
			_key,
			title,
			expiration
		},
		date
	}`;

	return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
	const query = `*[_type == "post" && caption match '${searchTerm}*'] {
		_id,
		caption,
		userId,
		postedBy->{
			_id,
			userName,
			image,
			email
		},
		likes,
		refrigeration[] {
			_key,
			title,
			expiration
		},
		freezing[] {
			_key,
			title,
			expiration
		},
		date
	}`;

	return query;
};

export const singleUserQuery = (userId: string | string[]) => {
	const query = `*[_type == "user" && _id == '${userId}']`;

	return query;
};

export const allUsersQuery = () => {
	const query = `*[_type == "user"]`;

	return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
	const query = `*[_type == 'post' && userId == '${userId}'] | order(_createdAt desc) {
		_id,
		caption,
		userId,
		postedBy->{
			_id,
			userName,
			image,
			email
		},
		likes,
		refrigeration[] {
			_key,
			title,
			expiration
		},
		freezing[] {
			_key,
			title,
			expiration
		},
		date
	}`;

	return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
	const query = `*[_type == 'post' && '${userId}' in likes[]._ref] | order(_createdAt desc) {
		_id,
		caption,
		userId,
		postedBy->{
			_id,
			userName,
			image,
			email
		},
		likes,
		refrigeration[] {
			_key,
			title,
			expiration
		},
		freezing[] {
			_key,
			title,
			expiration
		},
		date
	}`;

	return query;
};
