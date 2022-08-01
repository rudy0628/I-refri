import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestAccount from './SuggestAccount';
import Sorted from './Sorted';
import Footer from './Footer';

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<div>
			<div
				className="block xl:hidden p-3 text-xl"
				onClick={() => setShowSidebar(prevState => !prevState)}
			>
				{showSidebar ? (
					<ImCancelCircle className="mx-auto" />
				) : (
					<AiOutlineMenu className="mx-auto" />
				)}
			</div>
			{showSidebar && (
				<div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
					<div className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded">
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="text-xl hidden xl:block">For You</span>
							</div>
						</Link>
					</div>
					<SuggestAccount />
					<Sorted />
					<Footer />
				</div>
			)}
		</div>
	);
};

export default Sidebar;
