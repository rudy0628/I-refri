import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const createOrGetUser = async (response: any, addUser: any) => {
	const decode: { name: string; picture: string; sub: string; email: string } =
		jwtDecode(response.credential);
	const { name, picture, sub, email } = decode;

	const user = {
		_id: sub,
		_type: 'user',
		userName: name,
		image: picture,
		email: email,
	};

	addUser(user);

	await axios
		.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, user)
		.catch(error => console.log(error));
};
