import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import { useRouter } from 'next/router';

import RefrigeratorCard from '../../components/refrigerator/RefrigeratorCard';
import NoResult from '../../components/NoResult';
import { IUser, IRefrigerator } from '../../type';
import useAuthStore from '../../store/authStore';

const Search = ({ refrigerators }: { refrigerators: IRefrigerator[] }) => {
	const [isAccounts, setIsAccounts] = useState(false);
	const { allUsers } = useAuthStore();
	const router = useRouter();
	const { q }: any = router.query;

	const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const isRefrigerators = !isAccounts
		? 'border-b-2 border-black'
		: 'text-gray-400';
	const searchedAccounts = allUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(q.toLowerCase())
	);

	return (
		<div className="w-full">
			<Head>
				<title>IRefri - Search</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* Bar */}
			<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
					onClick={() => setIsAccounts(true)}
				>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${isRefrigerators}`}
					onClick={() => setIsAccounts(false)}
				>
					Refrigerators
				</p>
			</div>
			{/* Posts and Users */}
			{isAccounts ? (
				<div className="md:mt-10">
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((account: IUser, index: number) => (
							<Link href={`/profile/${account._id}`} key={index}>
								<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center hover:bg-gray-100">
									<div className="ml-4 md:w-16 md:h-16 w-10 h-10">
										<Image
											width={62}
											height={62}
											className="rounded-full"
											src={account.image}
											alt="profile"
											layout="responsive"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<p className="flex items-center gap-2 md:text-md font-bold text-primary">
											{account.userName}{' '}
											<GoVerified className="text-blue-400" />
										</p>
										<p className="capitalize font-semibold text-xs text-gray-500 hidden md:block">
											{account.userName}
										</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResult text={`No account result for ${q}`} />
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-col flex-wrap gap-6 md:justify-start">
					{refrigerators.length ? (
						refrigerators.map((refrigerator: IRefrigerator, index: number) => (
							<RefrigeratorCard post={refrigerator} key={index} />
						))
					) : (
						<NoResult text={`No refrigerator result for ${q}`} />
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	query: { q },
}: {
	query: { q: string };
}) => {
	const decodeQuery = encodeURIComponent(q);
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?q=${decodeQuery}`
	);

	return {
		props: { refrigerators: res.data },
	};
};

export default Search;
