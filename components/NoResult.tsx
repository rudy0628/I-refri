import React from 'react';

interface IProps {
	text: string;
}

const NoResult = ({ text }: IProps) => {
	return (
		<div className="w-full">
			<p className="text-center text-xl font-semibold">{text}</p>
		</div>
	);
};

export default NoResult;
