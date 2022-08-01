import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import RefrigeratorForm from '../components/refrigeratorForm/RefrigeratorForm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import useAuthStore from '../store/authStore';

const Upload = () => {
	const { userProfile }: any = useAuthStore();
	const [title, setTitle] = useState('My Refrigerator');
	const [refrigerationName, setRefrigerationName] = useState('');
	const [refrigerationExpiration, setRefrigerationExpiration] = useState('');
	const [freezingName, setFreezingName] = useState('');
	const [freezingExpiration, setFreezingExpiration] = useState('');

	const [refrigeration, setRefrigeration] = useState<
		{ _key: string; title: string; expiration: string }[]
	>([]);
	const [freezing, setFreezing] = useState<
		{ _key: string; title: string; expiration: string }[]
	>([]);

	const router = useRouter();

	const addRefrigerationHandler = () => {
		const newRefrigeration = {
			title: refrigerationName,
			expiration: refrigerationExpiration,
			_key: uuidv4(),
		};

		if (refrigerationName && refrigerationExpiration) {
			setRefrigerationName('');
			setRefrigerationExpiration('');
			setRefrigeration(prevState => [...prevState, newRefrigeration]);
		}
	};

	const addFreezingHandler = () => {
		const newFreezing = {
			title: freezingName,
			expiration: freezingExpiration,
			_key: uuidv4(),
		};

		if (freezingName && freezingExpiration) {
			setFreezingExpiration('');
			setFreezingName('');
			setFreezing(prevState => [...prevState, newFreezing]);
		}
	};

	const handlePost = async () => {
		if (title) {
			const document = {
				_type: 'post',
				caption: title,
				userId: userProfile?._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userProfile?._id,
				},
				date: new Date(),
				refrigeration,
				freezing,
			};

			await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
				document
			);
			router.push('/');
		}
	};

	return (
		<div className="w-full absolute left-0 top-[60px] pt-10 mb-10 bg-[#fff] flex justify-center">
			<Head>
				<title>IRefri - Upload</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="xl:w-[1200px] w-full p-5">
				{/* Header */}
				<div>
					<p className="text-2xl font-bold">Upload</p>
					<p className="text-md text-gray-400 mt-1">
						Post a refrigerator to your account
					</p>
				</div>
				{/* Form */}
				<div className="mt-5">
					{/* Title */}
					<input
						type="text"
						className="w-[50%] text-xl p-3 border-2 border-gray-400 rounded"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					{/* Refrigerator */}
					<RefrigeratorForm
						list={{ refrigeration, freezing }}
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
						detail={false}
					/>
				</div>
				<div className="mt-5 flex gap-6">
					<button
						onClick={() => {}}
						type="button"
						className="border-gray-200 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
					>
						Discard
					</button>
					<button
						onClick={handlePost}
						type="button"
						className="text-md font-medium p-2 rounded w-28 lg:w-44 outline-none bg-[#f51997] text-white"
					>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default Upload;
