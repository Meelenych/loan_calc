'use client';
import { React, useState } from 'react';

const CalcPage = () => {
	const initialFormData = {
		trade: '',
		payoff: '',
		price: '',
		otherAccessory: '',
		downPayment: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const total =
		Number(formData.price) +
		Number(formData.otherAccessory) +
		(Number(formData.trade) - Number(formData.payoff));

	const totalWithDown = total - Number(formData.downPayment);
	const totalWithTenDown = total - Number(total * 1.1 * 0.1);
	const totalWithTwentyDown = total - Number(total * 1.1 * 0.2);

	const toCurrency = n => {
		return n.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	// Your form submission logic here
	// 	console.log(formData);
	// };

	return (
		<div className='flex justify-evenly container mx-auto gap-5 p-5 flex-col sm:flex-row'>
			<div className='w-full md:w-1/4 flex flex-col items-center justify-center'>
				<h2>Enter the values here</h2>
				<form
					// onSubmit={handleSubmit}
					className='grid grid-cols-1 gap-4 w-full'>
					<input
						className='w-full rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						type='number'
						name='trade'
						id='trade'
						placeholder='Trade value'
						value={formData.trade}
						onChange={handleInputChange}
					/>
					<input
						className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						type='number'
						name='payoff'
						id='payoff'
						placeholder='Trade payoff'
						value={formData.payoff}
						onChange={handleInputChange}
					/>
					<input
						className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						type='number'
						name='price'
						id='price'
						placeholder='Vehicle price'
						value={formData.price}
						onChange={handleInputChange}
					/>
					<input
						className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						type='number'
						name='otherAccessory'
						id='otherAccessory'
						placeholder='Additional accessories cost'
						value={formData.otherAccessory}
						onChange={handleInputChange}
					/>
					<input
						className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
						type='number'
						name='downPayment'
						id='downPayment'
						placeholder='Down payment'
						value={formData.downPayment}
						onChange={handleInputChange}
					/>
					{/* <button
						type='submit'
						className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'>
						Calculate
					</button> */}
				</form>
			</div>

			<div className='w-full md:w-1/2'>
				{/* General information */}
				<div>
					<h2>General information</h2>
					<ul>
						<li>
							<p>
								Equity: {toCurrency(Number(formData.trade) - Number(formData.payoff))}
							</p>
						</li>
						<li>
							<p>
								Total price with accessories including trade cost and equity:{' '}
								{toCurrency(Number(formData.price) + Number(formData.otherAccessory))}
							</p>
						</li>
						<li>
							<p>
								Total + 10% for Tax, Title, Licensing and Registration:{' '}
								{toCurrency(total * 1.1)}
							</p>
						</li>
						<li>
							<p>20% down payment: {toCurrency(total * 1.1 * 0.2)}</p>
						</li>
						<li>
							<p>10% down payment: {toCurrency(total * 1.1 * 0.1)}</p>
						</li>
					</ul>
				</div>
				<hr />
				{/* Payments without money down */}
				<div>
					<h3>Payments without money down:</h3>
					<h4>Short term</h4>
					<ul>
						<li>Monthly payment 24: {toCurrency(((total * 1.1) / 24) * 1.05)}</li>
						<li>Monthly payment 36: {toCurrency(((total * 1.1) / 36) * 1.05)}</li>
					</ul>
					<h4>Long term</h4>
					<ul>
						<li>Monthly payment 60: {toCurrency(((total * 1.1) / 60) * 1.05)}</li>
						<li>Monthly payment 72: {toCurrency(((total * 1.1) / 72) * 1.05)}</li>
						<li>Monthly payment 84: {toCurrency(((total * 1.1) / 84) * 1.05)}</li>
					</ul>
				</div>
				<hr />
				{/* Payments with custom money down */}
				<div>
					<h3>Payments with custom money down:</h3>
					<h4>Short term</h4>
					<ul>
						<li>Monthly payment 24: {toCurrency((totalWithDown / 24) * 1.05)}</li>
						<li>Monthly payment 36: {toCurrency((totalWithDown / 36) * 1.05)}</li>
					</ul>
					<h4>Long term</h4>
					<ul>
						<li>Monthly payment 60: {toCurrency((totalWithDown / 60) * 1.05)}</li>
						<li>Monthly payment 72: {toCurrency((totalWithDown / 72) * 1.05)}</li>
						<li>Monthly payment 84: {toCurrency((totalWithDown / 84) * 1.05)}</li>
					</ul>
				</div>
				<hr />
				{/* Payments with 10% money down */}
				<div>
					<h3>Payments with 10% money down:</h3>
					<h4>Short term</h4>
					<ul>
						<li>Monthly payment 24: {toCurrency((totalWithTenDown / 24) * 1.05)}</li>
						<li>Monthly payment 36: {toCurrency((totalWithTenDown / 36) * 1.05)}</li>
					</ul>
					<h4>Long term</h4>
					<ul>
						<li>Monthly payment 60: {toCurrency((totalWithTenDown / 60) * 1.05)} </li>
						<li>Monthly payment 72: {toCurrency((totalWithTenDown / 72) * 1.05)}</li>
						<li>Monthly payment 84: {toCurrency((totalWithTenDown / 84) * 1.05)}</li>
					</ul>
				</div>
				<hr />
				{/* Payments with 20% money down */}
				<div>
					<h3>Payments with 20% money down:</h3>
					<h4>Short term</h4>
					<ul>
						<li>
							Monthly payment 24: {toCurrency((totalWithTwentyDown / 24) * 1.05)}
						</li>
						<li>
							Monthly payment 36: {toCurrency((totalWithTwentyDown / 36) * 1.05)}
						</li>
					</ul>
					<h4>Long term</h4>
					<ul>
						<li>
							Monthly payment 60: {toCurrency((totalWithTwentyDown / 60) * 1.05)}{' '}
						</li>
						<li>
							Monthly payment 72: {toCurrency((totalWithTwentyDown / 72) * 1.05)}
						</li>
						<li>
							Monthly payment 84: {toCurrency((totalWithTwentyDown / 84) * 1.05)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default CalcPage;
