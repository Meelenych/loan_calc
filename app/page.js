import Image from 'next/image';
import banknotes from './icons/banknotes.svg';
import bulb from './icons/bulb.svg';

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<div className='flex items-center'>
					<Image
						className='dark:invert'
						src={banknotes}
						alt='Next.js logo'
						width={100}
						height={38}
						priority
					/>
					<h1 className='ml-3 text-2xl'>Get you payments in seconds!</h1>
				</div>

				<div className='flex gap-4 items-center flex-col sm:flex-row'>
					<a
						className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						href='/calc'
						target='_blank'
						rel='noopener noreferrer'>
						<Image
							className='dark'
							src={banknotes}
							alt='logo'
							width={20}
							height={20}
						/>
						Start here
					</a>

					<a
						className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44'
						href=''
						target='_blank'
						rel='noopener noreferrer'>
						<Image
							className='dark:invert'
							src={bulb}
							alt='logo'
							width={20}
							height={20}
						/>
						Read tips
					</a>
				</div>
			</main>
			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</div>
	);
}
