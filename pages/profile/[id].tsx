import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import RefrigeratorCard from '../../components/refrigerator/RefrigeratorCard';
import NoResult from '../../components/NoResult';
import { GoVerified } from 'react-icons/go';
import { IUser, IRefrigerator } from '../../type';

interface IProps {
	data: {
		user: IUser;
		userCreatedPost: IRefrigerator[];
		userLikedPost: IRefrigerator[];
	};
}

const Profile = ({ data }: IProps) => {
	const [showUserRefrigerator, setShowUserRefrigerator] = useState(true);
	const [refrigeratorList, setRefrigeratorList] = useState<IRefrigerator[]>([]);
	const { user, userCreatedPost, userLikedPost } = data;

	const refrigerators = showUserRefrigerator
		? 'border-b-2 border-black'
		: 'text-gray-400';
	const liked = !showUserRefrigerator
		? 'border-b-2 border-black'
		: 'text-gray-400';

	useEffect(() => {
		if (showUserRefrigerator) {
			setRefrigeratorList(userCreatedPost);
		} else {
			setRefrigeratorList(userLikedPost);
		}
	}, [showUserRefrigerator, userCreatedPost, userLikedPost]);

	return (
		<div className="w-full">
			<Head>
				<title>IRefri - Profile</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* Profile */}
			<div className="flex gap-4 md:gap-10 mb-4 bg-white w-full">
				<div className="w-16 h-16 md:w-32 md:h-32">
					<Image
						src={user.image}
						width={120}
						height={120}
						className="rounded-full"
						alt="user profile"
						layout="responsive"
					/>
				</div>
				<div className="flex flex-col justify-center">
					<p className="md:text-2xl tracking-wider flex gap-1 items-center text-md font-bold text-primary lowercase">
						{user.userName.replaceAll(' ', '')}
						<GoVerified className="text-blue-400" />
					</p>
					<p className="capitalize md:text-xl text-xs text-gray-400">
						{user.userName}
					</p>
				</div>
			</div>
			{/* Bar */}
			<div className="flex gap-10 mb-10 border-b-2 border-gray-200 bg-white w-full">
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${refrigerators}`}
					onClick={() => setShowUserRefrigerator(true)}
				>
					Refrigerators
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
					onClick={() => setShowUserRefrigerator(false)}
				>
					Liked
				</p>
			</div>
			{/* Posts */}
			<div className="flex flex-col gap-6 flex-wrap md:justify-center">
				{refrigeratorList.length > 0 ? (
					refrigeratorList.map((post: IRefrigerator, index: number) => (
						<RefrigeratorCard post={post} key={index} />
					))
				) : (
					<NoResult
						text={`No ${
							showUserRefrigerator ? '' : 'liked'
						} refrigerators yet!`}
					/>
				)}
			</div>
		</div>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`
	);

	return {
		props: { data: res.data },
	};
};

export default Profile;
