import Image from 'next/image';
import banknotes from './icons/banknotes.svg';
import bulb from './icons/bulb.svg';

export default function Home() {
	return (
		<div className='grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
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

				<div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
					<a
						className='rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						href='/calc'
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

					{/* Interest rates */}
					<div className='dropdown dropdown-hover dropdown-top  gap-2 w-full'>
						<div
							tabIndex={0}
							role='button'
							className='btn rounded-lg btn-warning w-full'>
							Check interest rates
						</div>
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
										<th>Score</th>
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

					<a
						href='/tips'
						className='rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
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
