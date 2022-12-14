import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '../utils';

import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import useAuthStore from '../store/authStore';

const Navbar = () => {
	const { userProfile, addUser, removeUser }: any = useAuthStore();
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		if (searchValue) {
			router.push(`/search?q=${encodeURIComponent(searchValue)}`);
			setSearchValue('');
		}
	};

	return (
		<div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
			{/* LOGO */}
			<Link href="/">
				<p className="font-dancing text-3xl font-semibold text-[#F51997] cursor-pointer">
					I-refri
				</p>
			</Link>
			{/* SEARCH */}
			<div className="relative hidden md:block">
				<form
					onSubmit={handleSearch}
					className="absolute md:static top-10 left-20 bg-white"
				>
					<input
						type="text"
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
						placeholder="Search accounts and refrigerators"
						className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
					/>
					<button
						onClick={handleSearch}
						className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
					>
						<BiSearch />
					</button>
				</form>
			</div>
			{/* LOGIN */}
			<div>
				{userProfile ? (
					<div className="flex gap-5 md:gap-10">
						{/* Upload button */}
						<Link href="/upload">
							<button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 border-[#F51997] rounded">
								<IoMdAdd className="text-xl text-[#F51997]" />{' '}
								<span className="hidden md:block">Upload</span>
							</button>
						</Link>
						{/* Image */}
						{userProfile.image && (
							<Link href="/">
								<>
									<Image
										width={40}
										height={40}
										className="rounded-full cursor-pointer"
										src={userProfile.image}
										alt="profile"
									/>
								</>
							</Link>
						)}
						<button
							type="button"
							className="px-2"
							onClick={() => {
								googleLogout();
								removeUser();
							}}
						>
							<AiOutlineLogout className="text-[#f51997] text-xl" />
						</button>
					</div>
				) : (
					<GoogleLogin
						onSuccess={response => createOrGetUser(response, addUser)}
						onError={() => console.log('error')}
					/>
				)}
			</div>
		</div>
	);
};

export default Navbar;
