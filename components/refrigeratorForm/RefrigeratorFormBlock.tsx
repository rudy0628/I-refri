import React from 'react';
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import useAuthStore from '../../store/authStore';

interface IProps {
	title: string;
	list: {
		_key: string;
		title: string;
		expiration: string;
	}[];
	value: {
		name: string;
		expiration: string;
	};
	setFunc: {
		name: (value: string) => void;
		expiration: (value: string) => void;
	};
	deleteFunc?: (key: string) => void;
	addFunc: () => void;
	userId?: string;
	detail: boolean;
}

const RefrigeratorFormBlock = ({
	title,
	list,
	value,
	setFunc,
	addFunc,
	deleteFunc,
	userId,
	detail,
}: IProps) => {
	const { userProfile }: any = useAuthStore();
	let showForm = userId ? userId === userProfile._id : true;

	return (
		<div className="h-[500px] w-full md:w-[80%] xl:w-auto xl:flex-1 bg-gray-200 rounded-xl p-3 overflow-y-scroll shadow-md">
			<p className="text-center text-xl">{title}</p>
			{list.map((item, index) => (
				<div
					key={index}
					className="bg-white rounded-xl mt-5 p-3 flex items-center"
				>
					<div>
						<p className="text-xl">{item.title}</p>
						<p className="text-sm text-gray-400">{item.expiration}</p>
					</div>
					{userId && userProfile._id === userId && detail && (
						<button className="ml-auto" onClick={() => deleteFunc!(item._key)}>
							<AiOutlineCloseCircle className="text-3xl text-red-400" />
						</button>
					)}
				</div>
			))}
			{/* Add form */}
			{showForm && (
				<div className="bg-white rounded-xl mt-5 p-3 flex md:items-center gap-2 sm:flex-row flex-col">
					<input
						type="text"
						placeholder="Name"
						className="p-2 border-2 border-gray-400 rounded"
						value={value.name}
						onChange={e => setFunc.name(e.target.value)}
					/>
					<input
						type="Date"
						placeholder="Expiration Date"
						className="p-2 border-2 border-gray-400 rounded"
						value={value.expiration}
						onChange={e => setFunc.expiration(e.target.value)}
					/>
					<button className="ml-auto" onClick={addFunc}>
						<AiOutlinePlusCircle className="text-3xl text-gray-400 hover:text-black" />
					</button>
				</div>
			)}
		</div>
	);
};

export default RefrigeratorFormBlock;
