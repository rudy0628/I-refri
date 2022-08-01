import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Refrigerator from './Refrigerator';
import { GoVerified } from 'react-icons/go';

import { IRefrigerator } from '../../type';

interface IProps {
	post: IRefrigerator;
}

const RefrigeratorCard = ({ post }: IProps) => {
	return (
		<div className="flex flex-col border-b-2 border-gray-200 pb-6">
			{/* Header */}
			<div className="flex gap-3 p-2 cursor-pointer font-semibold">
				{/* Image */}
				<div className="md:w-16 md:h-16 w-10 h-10">
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
				{/* User Info */}
				<div>
					<Link href={`/profile/${post.postedBy._id}`}>
						<div className="flex items-center gap-2">
							<p className="flex items-center gap-2 md:text-md font-bold text-primary">
								{post.postedBy.userName}{' '}
								<GoVerified className="text-blue-400 text-md" />
							</p>
							<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
								{post.postedBy.userName}
							</p>
						</div>
					</Link>
					<p className="font-medium text-xs text-gray-500 hidden md:block">
						{new Date(post.date).toLocaleString('zh-TW')}
					</p>
					<p className="mt-2 font-normal">{post.caption}</p>
				</div>
			</div>
			<Link href={`/detail/${post._id}`}>
				{/* Refrigerator */}
				<div>
					<Refrigerator post={post} />
				</div>
			</Link>
		</div>
	);
};

export default RefrigeratorCard;
