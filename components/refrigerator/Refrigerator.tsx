import React from 'react';
import RefrigeratorBlock from './RefrigeratorBlock';

import { IRefrigerator } from '../../type';

interface IProps {
	post: IRefrigerator;
}

const Refrigerator = ({ post }: IProps) => {
	return (
		<div className="mt-2 flex flex-col md:flex-row items-center gap-5 cursor-pointer p-3">
			{/* Refrigeration */}
			<RefrigeratorBlock
				title="Refrigeration"
				type="refrigeration"
				post={post}
			/>
			{/* Freezing */}
			<RefrigeratorBlock title="Freezing" type="freezing" post={post} />
		</div>
	);
};

export default Refrigerator;
