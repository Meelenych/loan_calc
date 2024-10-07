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
	const [loJack, setLoJack] = useState(0);
	const [roadHazard, setRoadHazard] = useState(0);

	const handleLoJackChange = e => {
		setLoJack(e.target.checked ? 499 : 0);
	};

	const handleRoadHazardChange = e => {
		setRoadHazard(e.target.checked ? 499 : 0);
	};

	const equity = Number(formData.trade) - Number(formData.payoff);
	const total =
		Number(formData.price) +
		Number(loJack) +
		Number(roadHazard) +
		Number(formData.otherAccessory) -
		equity;

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

	return (
		<div className='flex justify-evenly items-center container mx-auto gap-5 p-5 flex-col sm:flex-row'>
			{/* Form inputs */}
			<div className='w-full md:w-1/4 flex flex-col items-center justify-center'>
				<h2>Enter the values here</h2>
				<form className='grid grid-cols-1 gap-4 w-full'>
					<label htmlFor='trade'>
						{' '}
						Trade value
						<input
							className='w-full rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='trade'
							id='trade'
							placeholder='Trade value'
							value={formData.trade}
							onChange={handleInputChange}
						/>
					</label>
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
					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>LoJack</span>
							<input
								type='checkbox'
								className='checkbox'
								defaultChecked={loJack === 499}
								onChange={handleLoJackChange}
							/>
						</label>
					</div>

					<div className='form-control'>
						<label className='label cursor-pointer'>
							<span className='label-text'>Road Hazard</span>
							<input
								type='checkbox'
								className='checkbox'
								defaultChecked={roadHazard === 499}
								onChange={handleRoadHazardChange}
							/>
						</label>
					</div>
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
				</form>
				{/* Interest rates */}
				<div className='dropdown dropdown-hover dropdown-top'>
					<div
						tabIndex={0}
						role='button'
						className='btn rounded-full btn-warning m-1'>
						Interest rates
					</div>

					<div
						tabIndex={0}
						className='dropdown-content menu bg-base-100 rounded-box z-[1] w-max p-2 shadow'>
						<h5 className='text-lg'>Credit-based Rates</h5>
						<table className='table'>
							{/* head */}
							<thead>
								<tr>
									<th>CREDIT GRADE</th>
									<th>FICO SCORE</th>
									<th>UP TO 60 MONTHS</th>
									<th>61-72 MONTHS</th>
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
								<tr>
									<th>C</th>
									<td>600-639</td>
									<td>11.24%</td>
									<td>11.50%</td>
								</tr>
								<tr>
									<th>D</th>
									<td>550-599</td>
									<td>15.24%</td>
									<td>15.50%</td>
								</tr>
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
			</div>

			{/* Loan information */}
			<div className='w-full md:w-1/2'>
				{/* General information */}
				<div>
					<h2 className='text-xl font-medium'>General information</h2>
					<ul>
						<li>
							<p>
								{equity >= 0 ? 'Positive' : 'Negative'} equity: {toCurrency(equity)}
							</p>
						</li>
						<li>
							<p>
								Total price with accessories including trade cost and equity:{' '}
								{toCurrency(total)}
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
				{/* Payments accordeon */}
				<div className='join join-vertical w-full'>
					{/* Payments without money down */}
					<div className='collapse collapse-arrow join-item border-base-300 border'>
						<input
							type='radio'
							name='my-accordion-4'
							defaultChecked
						/>

						<div className='collapse-title text-xl font-medium'>
							<h3>Payments without money down:</h3>
						</div>
						<div className='collapse-content'>
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
					</div>
					{/* Payments with custom money down */}
					<div className='collapse collapse-arrow join-item border-base-300 border'>
						<input
							type='radio'
							name='my-accordion-4'
						/>
						<div className='collapse-title text-xl font-medium'>
							<h3>Payments with custom money down:</h3>
						</div>
						<div className='collapse-content'>
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
					</div>
					{/* Payments with 10% money down */}
					<div className='collapse collapse-arrow join-item border-base-300 border'>
						<input
							type='radio'
							name='my-accordion-4'
						/>
						<div className='collapse-title text-xl font-medium'>
							<h3>Payments with 10% money down:</h3>
						</div>
						<div className='collapse-content'>
							<h4>Short term</h4>
							<ul>
								<li>
									Monthly payment 24: {toCurrency((totalWithTenDown / 24) * 1.05)}
								</li>
								<li>
									Monthly payment 36: {toCurrency((totalWithTenDown / 36) * 1.05)}
								</li>
							</ul>
							<h4>Long term</h4>
							<ul>
								<li>
									Monthly payment 60: {toCurrency((totalWithTenDown / 60) * 1.05)}{' '}
								</li>
								<li>
									Monthly payment 72: {toCurrency((totalWithTenDown / 72) * 1.05)}
								</li>
								<li>
									Monthly payment 84: {toCurrency((totalWithTenDown / 84) * 1.05)}
								</li>
							</ul>
						</div>
					</div>
					{/* Payments with 20% money down */}
					<div className='collapse collapse-arrow join-item border-base-300 border'>
						<input
							type='radio'
							name='my-accordion-4'
						/>
						<div className='collapse-title text-xl font-medium'>
							<h3>Payments with 20% money down:</h3>
						</div>
						<div className='collapse-content'>
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
			</div>
		</div>
	);
};

export default CalcPage;
