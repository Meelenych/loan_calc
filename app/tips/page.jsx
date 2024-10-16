import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import back from '../icons/back.svg';

const TipsPage = () => {
	return (
		<div>
			<h1 className='text-xl'>TIPS page</h1>
			<Link
				className='btn rounded-lg btn-warning w-full sm:w-40'
				href='/'
				rel='noopener noreferrer'>
				<Image
					className='dark'
					src={back}
					alt='back'
					width={20}
					height={20}
				/>
				Back
			</Link>
		</div>
	);
};

export default TipsPage;
