import React from 'react';
import RefrigeratorFormBlock from './RefrigeratorFormBlock';

interface IProps {
	list: {
		refrigeration: {
			_key: string;
			title: string;
			expiration: string;
		}[];
		freezing: {
			_key: string;
			title: string;
			expiration: string;
		}[];
	};
	refrigerationValue: {
		name: string;
		expiration: string;
	};
	freezingValue: {
		name: string;
		expiration: string;
	};
	refrigerationSetFunc: {
		name: (value: string) => void;
		expiration: (value: string) => void;
	};
	freezingSetFunc: {
		name: (value: string) => void;
		expiration: (value: string) => void;
	};
	addRefrigeration: () => void;
	addFreezing: () => void;
	deleteRefrigeration?: (key: string) => void;
	deleteFreezing?: (key: string) => void;
	userId?: string;
	detail: boolean;
}

const RefrigeratorForm = ({
	list,
	refrigerationValue,
	freezingValue,
	refrigerationSetFunc,
	freezingSetFunc,
	addRefrigeration,
	addFreezing,
	deleteRefrigeration,
	deleteFreezing,
	userId,
	detail,
}: IProps) => {
	let style;
	if (detail) {
		style =
			'flex flex-col lg:flex-row gap-5 bg-gray-400 w-full xl:w-[80%] p-10 items-center justify-center';
	} else {
		style = 'flex flex-col xl:flex-row gap-5 mt-5';
	}

	return (
		<div className={style}>
			<RefrigeratorFormBlock
				title="Refrigeration"
				list={list.refrigeration}
				value={refrigerationValue}
				setFunc={refrigerationSetFunc}
				addFunc={addRefrigeration}
				deleteFunc={deleteRefrigeration}
				userId={userId}
				detail={detail}
			/>
			<RefrigeratorFormBlock
				title="Freezing"
				list={list.freezing}
				value={freezingValue}
				setFunc={freezingSetFunc}
				addFunc={addFreezing}
				deleteFunc={deleteFreezing}
				userId={userId}
				detail={detail}
			/>
		</div>
	);
};

export default RefrigeratorForm;
