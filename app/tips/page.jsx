import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import back from '../icons/back.svg';
import banknotes_grey from '../icons/banknotes_grey.svg';
import ThemeController from '../components/theme';

const TipsPage = () => {
	return (
		<div className='py-5 px-4 sm:px-10 min-h-screen w-full flex flex-col items-center'>
			{/* Back, theme and trade btns */}
			<div className='grid grid-cols-3 gap-4 mb-8 w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-2/4'>
				<Link
					className='btn rounded-lg btn-outline hover:bg-slate-600 w-full'
					href='/'
					rel='noopener noreferrer'>
					<Image
						className=''
						src={back}
						alt='back'
						width={20}
						height={20}
					/>
					<span className='hidden md:block label-text text-base font-medium text-[#9CA3AF] mr-4'>
						Back
					</span>
				</Link>
				<div className='flex justify-center items-center'>
					<ThemeController />
				</div>
				<div className='flex justify-end items-center'>
					<Link
						className='btn rounded-lg btn-outline hover:bg-slate-600 w-full'
						href='/calc'
						rel='noopener noreferrer'>
						<Image
							className=''
							src={banknotes_grey}
							alt='banknotes'
							width={20}
							height={20}
						/>
						<span className='hidden md:block label-text text-base font-medium text-[#9CA3AF] mr-4'>
							Calculator
						</span>
					</Link>
				</div>
			</div>
			{/* Heading */}
			<header className='w-full text-center mb-4'>
				<h1 className='text-lg sm:text-2xl mb-2 underline'>
					Car Loan Calculator Tips
				</h1>
				<p>
					Designed to assist Young Automotive Group salespeople in estimating numbers
					for clients during the write-up process.
				</p>
			</header>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-10'>
				<section>
					<article className='mb-4'>
						<h2 className='text-lg underline mb-2'>Understanding Key Inputs</h2>
						<p>
							Before running the car loan calculator, make sure to input the correct
							values for the following:
						</p>
						<ul>
							<li>
								<strong>Vehicle Price:</strong> Enter the retail price or negotiated
								sale price of the vehicle.
							</li>
							<li>
								<strong>Trade Value:</strong> Input the value of the client's trade-in
								vehicle. The client may receive this from appraisals or past deals.
							</li>
							<li>
								<strong>Payoff Amount:</strong> If there's still a loan on the trade-in
								vehicle, enter the remaining balance here. Ensure it’s not higher than
								the trade value.
							</li>
							<li>
								<strong>Down Payment:</strong> Capture any cash down payment offered by
								the client to reduce the loan amount.
							</li>
							<li>
								<strong>Loan Term:</strong> Choose the term length (in months),
								typically ranging from 24 to 72 months.
							</li>
							<li>
								<strong>Interest Rate:</strong> Enter the the client’s credit score to
								get the interest rate a person qualifies for.
							</li>
							<li>
								<strong>Accessories:</strong> Include the value of any extra accessories
								or packages added to the vehicle.
							</li>
						</ul>
					</article>
					<article className='mb-4'>
						<h2 className='text-lg underline mb-2'>How the Calculator Works</h2>
						<p>
							The calculator will use the provided inputs to estimate the following:
						</p>
						<ul>
							<li>
								<strong>Monthly Payment:</strong> The estimated amount the client will
								pay monthly, based on the loan term and interest rate.
							</li>
							<li>
								<strong>Total Loan Amount:</strong> This includes the vehicle price,
								accessories, trade-in value, and down payment.
							</li>
							<li>
								<strong>Finance Breakdown:</strong> Displaying the impact of interest
								over the loan period, showing the total cost of the loan.
							</li>
						</ul>
					</article>
				</section>

				<section>
					<article className='mb-4'>
						<h2 className='text-lg underline mb-2'>Tips for Accuracy</h2>
						<p>To get the most accurate estimates:</p>
						<ul>
							<li>
								Ensure all numbers (trade value, price, down payment) are up-to-date and
								verified by appraisers or past sales records.
							</li>
							<li>
								Consider different loan terms and rates to show the client multiple
								payment scenarios.
							</li>
							<li>
								Keep accessory costs realistic and aligned with the dealership’s pricing
								for extras.
							</li>
							<li>
								Always remind the client that these are estimates, and the final numbers
								will depend on credit approval and the lender’s terms.
							</li>
						</ul>
					</article>

					<article className='mb-4'>
						<h2 className='text-lg underline mb-2'>Next Steps After Calculation</h2>
						<p>Once the rough numbers are ready:</p>
						<ul>
							<li>
								Present the monthly payment options to the client, offering them a
								choice of term lengths.
							</li>
							<li>
								Discuss how trade value and down payment affect their monthly payment
								and total cost.
							</li>
							<li>
								Help the client understand any differences between estimated payments
								and final lender offers.
							</li>
							<li>
								Use these numbers to move forward with completing the deal, preparing
								the final paperwork and approval process.
							</li>
						</ul>
					</article>
				</section>
			</div>
			<footer className='w-full text-center'>
				<p>
					By using this car loan calculator, you can provide clients with a
					transparent and helpful way to understand their financing options and close
					deals confidently.
				</p>
			</footer>
		</div>
	);
};

export default TipsPage;
