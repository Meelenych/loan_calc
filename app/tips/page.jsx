import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import back from '../icons/back.svg';

const TipsPage = () => {
	return (
		<div>
			<h1 className='text-xl'>TIPS page</h1>
			<Link
				className='btn rounded-lg btn-outline hover:bg-slate-600 w-full'
				href='/'
				rel='noopener noreferrer'>
				<Image
					className='dark'
					src={back}
					alt='back'
					width={20}
					height={20}
				/>
				<span className='label-text text-base font-medium text-[#9CA3AF] mr-4'>
					Back
				</span>
			</Link>
		</div>
	);
};

export default TipsPage;
