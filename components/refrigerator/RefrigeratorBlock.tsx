import React from 'react';
import { IRefrigerator } from '../../type';
import NoResult from '../NoResult';

interface IProps {
	title: string;
	type: string;
	post: IRefrigerator;
}

const RefrigeratorBlock = ({ post, title, type }: IProps) => {
	let list;
	if (type === 'refrigeration') {
		list = post.refrigeration;
	} else {
		list = post.freezing;
	}

	return (
		<div className="md:flex-1 h-[400px] w-full md:w-auto rounded-xl bg-gray-200 p-3 flex flex-col gap-3 overflow-y-scroll shadow-md">
			<h2 className="text-xl text-center">{title}</h2>
			{list.length ? (
				list.map(item => (
					<div className="p-2 bg-white rounded-xl" key={item._key}>
						<p className="text-xl">{item.title}</p>
						<p className="text-sm text-gray-400 mt-2">
							{new Date(item.expiration).toLocaleString('zh-TW', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							})}
						</p>
					</div>
				))
			) : (
				<NoResult text="No freezing item" />
			)}
		</div>
	);
};

export default RefrigeratorBlock;
