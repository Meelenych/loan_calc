'use client';
import Image from 'next/image';
import banknotes from './icons/banknotes.svg';
import bulb from './icons/bulb.svg';
import Link from 'next/link';
import ThemeController from './components/theme';

export default function Home() {
	return (
		<div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<ThemeController />
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<div className='flex items-center'>
					<Image
						className=''
						src={banknotes}
						alt='banknotes'
						width={100}
						height={38}
						priority
					/>
					<h1 className='ml-3 text-2xl'>Get you payments in seconds!</h1>
				</div>

				<div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
					<Link
						className='rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-green-500 text-background gap-2 hover:bg-green-700 dark:hover:bg-green-300 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						href='/calc'
						rel='noopener noreferrer'>
						<Image
							className='dark'
							src={banknotes}
							alt='banknotes'
							width={20}
							height={20}
						/>
						Start here
					</Link>

					{/* Interest rates */}
					<div className='dropdown dropdown-hover dropdown-top  gap-2 w-full'>
						<button
							tabIndex={0}
							type='button'
							className='btn rounded-lg btn-warning w-full'>
							Check interest rates
						</button>
						{/* Rates table */}
						<div
							tabIndex={0}
							className='dropdown-content sm:-translate-x-1/4 menu bg-base-300 rounded-lg z-[1] p-2 shadow'>
							<h5 className='text-base text-center'>Credit-based rates</h5>
							<table className='table table-xs sm:table'>
								{/* head */}
								<thead>
									<tr>
										<th>Grade</th>
										<th>Credit score</th>
										<th>Up to 60 mths </th>
										<th>61-72 mths</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}
									<tr>
										<th>A+</th>
										<td>730+</td>
										<td>6.49%</td>
										<td>6.75%</td>
									</tr>
									{/* row 2 */}
									<tr>
										<th>A</th>
										<td>680-729</td>
										<td>6.99%</td>
										<td>7.25%</td>
									</tr>
									{/* row 3 */}
									<tr>
										<th>B</th>
										<td>640-679</td>
										<td>8.24%</td>
										<td>8.50%</td>
									</tr>
									{/* row 4 */}
									<tr>
										<th>C</th>
										<td>600-639</td>
										<td>11.24%</td>
										<td>11.50%</td>
									</tr>
									{/* row 5 */}
									<tr>
										<th>D</th>
										<td>550-599</td>
										<td>15.24%</td>
										<td>15.50%</td>
									</tr>
									{/* row 6 */}
									<tr>
										<th>E</th>
										<td>&lt;549</td>
										<td>18.00%</td>
										<td>18.00%</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<Link
						href='/tips'
						className='rounded-lg border border-solid border-black/[.08] dark:border-white/[0.5] transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-orange-600 hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						rel='noopener noreferrer'>
						<Image
							className=''
							src={bulb}
							alt='logo'
							width={20}
							height={20}
						/>
						Read tips
					</Link>
				</div>
			</main>
			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</div>
	);
}
