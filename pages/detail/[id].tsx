import React, { useState } from 'react';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import RefrigeratorForm from '../../components/refrigeratorForm/RefrigeratorForm';
import LikeButton from '../../components/LikeButton';

import { IRefrigerator } from '../../type';
import useAuthStore from '../../store/authStore';

interface IProps {
	postDetail: IRefrigerator;
}

const Detail = ({ postDetail }: IProps) => {
	const [post, setPost] = useState(postDetail);
	const { userProfile }: any = useAuthStore();
	const [refrigerationName, setRefrigerationName] = useState('');
	const [refrigerationExpiration, setRefrigerationExpiration] = useState('');
	const [freezingName, setFreezingName] = useState('');
	const [freezingExpiration, setFreezingExpiration] = useState('');

	const handleLike = async (like: boolean) => {
		if (userProfile) {
			const { data } = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`,
				{ userId: userProfile._id, postId: post._id, like }
			);

			setPost({ ...post, likes: data.likes });
		}
	};

	const addRefrigerationHandler = () => {
		const refrigeration = [...post.refrigeration];
		if (refrigerationName && refrigerationExpiration) {
			refrigeration.push({
				_key: uuidv4(),
				title: refrigerationName,
				expiration: refrigerationExpiration,
			});

			setRefrigerationName('');
			setRefrigerationExpiration('');
		}

		setPost({ ...post, refrigeration: refrigeration });
	};

	const addFreezingHandler = () => {
		const freezing = [...post.freezing];
		if (freezingName && freezingExpiration) {
			freezing.push({
				_key: uuidv4(),
				title: freezingName,
				expiration: freezingExpiration,
			});

			setFreezingName('');
			setFreezingExpiration('');
		}
		setPost({ ...post, freezing: freezing });
	};

	const deleteRefrigerationHandler = (key: string) => {
		let refrigeration = [...post.refrigeration];
		if (key) {
			refrigeration = refrigeration.filter(item => item._key !== key);
			setPost({ ...post, refrigeration: refrigeration });
		}
	};

	const deleteFreezingHandler = (key: string) => {
		let freezing = [...post.freezing];
		if (key) {
			freezing = freezing.filter(item => item._key !== key);
			setPost({ ...post, freezing: freezing });
		}
	};

	const savePostHandler = async () => {
		await axios.put(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
			{
				postId: post._id,
				userId: post.userId,
				refrigeration: post.refrigeration,
				freezing: post.freezing,
			}
		);
	};

	return (
		<div className="flex w-full h-full absolute left-0 top-0 bg-white xl:flex-row flex-col">
			<Head>
				<title>IRefri - Detail</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* Refrigerator */}
			<RefrigeratorForm
				list={{ refrigeration: post.refrigeration, freezing: post.freezing }}
				refrigerationValue={{
					name: refrigerationName,
					expiration: refrigerationExpiration,
				}}
				freezingValue={{
					name: freezingName,
					expiration: freezingExpiration,
				}}
				refrigerationSetFunc={{
					name: setRefrigerationName,
					expiration: setRefrigerationExpiration,
				}}
				freezingSetFunc={{
					name: setFreezingName,
					expiration: setFreezingExpiration,
				}}
				addRefrigeration={addRefrigerationHandler}
				addFreezing={addFreezingHandler}
				deleteRefrigeration={deleteRefrigerationHandler}
				deleteFreezing={deleteFreezingHandler}
				userId={post.postedBy._id}
				detail={true}
			/>
			<div className="relative">
				<div className="lg:mt-20 mt-10">
					{/* Header */}
					<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
						<div className="ml-4 md:w-16 md:h-16 w-10 h-10">
							<Link href={`/profile/${post.postedBy._id}`}>
								<>
									<Image
										width={62}
										height={62}
										className="rounded-full"
										src={post.postedBy.image}
										alt="profile"
										layout="responsive"
									/>
								</>
							</Link>
						</div>
						<div>
							<Link href={`/profile/${post.postedBy._id}`}>
								<div className="flex flex-col gap-2">
									<p className="flex items-center gap-2 md:text-md font-bold text-primary">
										{post.postedBy.userName}{' '}
										<GoVerified className="text-blue-400 text-md" />
									</p>
									<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
										{post.postedBy.userName}
									</p>
								</div>
							</Link>
						</div>
					</div>
					{/* Title */}
					<p className="px-8 text-lg text-gray-600 mt-5">{post.caption}</p>
					{/* Like Button */}
					<div className="my-10 px-10 flex gap-4 items-center">
						{userProfile && (
							<LikeButton
								likes={post.likes}
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}
					</div>
					{/* btn group */}
					<div className="flex items-center px-8 gap-4 mb-10">
						<Link href="/">
							<button className="border-2 border-gray-400 py-1 px-4 rounded-xl text-lg">
								Back
							</button>
						</Link>
						{userProfile?._id === post.postedBy._id && (
							<button
								className="bg-[#f51997] text-white py-1 px-4 rounded-xl text-lg"
								onClick={savePostHandler}
							>
								Save
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
	);

	return {
		props: { postDetail: data },
	};
};

export default Detail;
