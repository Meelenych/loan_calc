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

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Your form submission logic here
		console.log(formData);
	};

	return (
		<div className='flex justify-evenly container mx-auto gap-5 p-5 flex-col sm:flex-row'>
			<div className='w-full md:w-1/4 flex flex-col items-center justify-center'>
				<h2>Enter the values here</h2>
				<form
					onSubmit={handleSubmit}
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
					<button
						type='submit'
						className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'>
						Calculate
					</button>
				</form>
			</div>
			<div className='w-full md:w-1/2'>
				<ul>
					<li>
						<p>
							Equity:{' '}
							{(Number(formData.trade) - Number(formData.payoff)).toLocaleString(
								'en-US',
								{
									style: 'currency',
									currency: 'USD',
								},
							)}
						</p>
					</li>
					<li>
						<p>
							Total price with accessories including trade cost and equity:{' '}
							{(
								Number(formData.price) + Number(formData.otherAccessory)
							).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</li>
					<li>
						<p>
							Total + 10% for Tax, Title, Licensing and Registration:{' '}
							{(
								(Number(formData.price) +
									Number(formData.otherAccessory) +
									(Number(formData.trade) - Number(formData.payoff))) *
								1.1
							).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</li>
					<li>
						<p>Payment 3</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CalcPage;
