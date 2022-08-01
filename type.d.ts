export interface IRefrigerator {
	caption: string;
	_id: string;
	postedBy: {
		_id: string;
		userName: string;
		image: string;
		email: string;
	};
	likes: {
		postedBy: {
			_id: string;
			userName: string;
			image: string;
			email: string;
		};
	}[];
	userId: string;
	date: string;
	refrigeration: {
		title: string;
		expiration: string;
		_key: string;
	}[];
	freezing: {
		title: string;
		expiration: string;
		_key: string;
	}[];
}

export interface IUser {
	_id: string;
	_type: string;
	userName: string;
	image: string;
	email: string;
}
