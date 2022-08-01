import type { NextPage } from 'next';
import { IRefrigerator } from '../type';
import Head from 'next/head';
import RefrigeratorCard from '../components/refrigerator/RefrigeratorCard';
import NoResult from '../components/NoResult';
import usePostStore from '../store/postStore';

import axios from 'axios';

interface IProps {
	refrigerators: IRefrigerator[];
}

const Home: NextPage<IProps> = ({ refrigerators }) => {
	const { isDesc } = usePostStore();
	let sortedRefrigerators;
	if (isDesc) {
		sortedRefrigerators = refrigerators.sort(
			(a: IRefrigerator, b: IRefrigerator) =>
				+new Date(b.date).getTime() - +(+new Date(a.date).getTime())
		);
	} else {
		sortedRefrigerators = refrigerators.sort(
			(a: IRefrigerator, b: IRefrigerator) =>
				+new Date(a.date).getTime() - +(+new Date(b.date).getTime())
		);
	}

	return (
		<div className="flex flex-col gap-10 refrigerators h-full">
			<Head>
				<title>IRefri - Home</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{refrigerators.length ? (
				sortedRefrigerators.map((refrigerator: IRefrigerator) => (
					<RefrigeratorCard key={refrigerator._id} post={refrigerator} />
				))
			) : (
				<NoResult text="No any refrigerator" />
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	query: { topic },
}: {
	query: { topic: string };
}) => {
	let response = null;
	if (topic) {
		response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`
		);
	} else {
		response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
	}

	return {
		props: {
			refrigerators: response.data,
		},
	};
};

export default Home;
