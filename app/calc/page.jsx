'use client';
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalcPage = () => {
	const initialFormData = {
		trade: '',
		payoff: '',
		price: '',
		otherAccessory: '',
		downPayment: '',
		score: '',
	};

	const [errors, setErrors] = useState({
		trade: '',
		payoff: '',
		price: '',
		otherAccessory: '',
		downPayment: '',
		score: '',
	});

	const [formData, setFormData] = useState(initialFormData);
	const [loJack, setLoJack] = useState(499);
	const [roadHazard, setRoadHazard] = useState(499);
	const [interestRate, setInterestRate] = useState(1.18);

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

	const totalWithTax = total * 1.12;
	const totalWithDown = totalWithTax - Number(formData.downPayment);
	const totalWithTenDown = totalWithTax - Number(totalWithTax * 0.1);
	const totalWithTwentyDown = totalWithTax - Number(totalWithTax * 0.2);

	const getInterestRate = () => {
		if (formData.score <= 549) {
			return setInterestRate(1.18);
		} else if (formData.score <= 599 && formData.score >= 550) {
			return setInterestRate(1.155);
		} else if (formData.score <= 639 && formData.score >= 600) {
			return setInterestRate(1.115);
		} else if (formData.score <= 679 && formData.score >= 640) {
			return setInterestRate(1.085);
		} else if (formData.score <= 729 && formData.score >= 680) {
			return setInterestRate(1.0725);
		} else if (formData.score >= 730) {
			return setInterestRate(1.0675);
		} else {
			return setInterestRate(1.18);
		}
	};

	const toCurrency = n => {
		return n.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
		validateFields();
		// Clear the error for the specific field being typed in
		setErrors(prevErrors => ({
			...prevErrors,
			[name]: '',
		}));
	};

	useEffect(() => {
		getInterestRate();
	}, [formData]);

	const validateFields = () => {
		let formErrors = {};

		if (
			(formData.trade && formData.trade < 100) ||
			(formData.trade && formData.trade > 50000)
		) {
			formErrors.trade = 'Trade value must be between 100 and 50000';
			// toast.info(formErrors.trade);
		}

		if ((formData.trade && !formData.payoff) || formData.payoff < 0) {
			formErrors.payoff = 'Payoff is required and must be non-negative';
		}

		// Add further validations...

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	return (
		<div className='min-h-screen flex flex-col sm:flex-row justify-evenly items-center gap-5 p-5'>
			<ToastContainer />
			{/* Form inputs */}
			<div className='w-full md:w-1/4 flex flex-col items-center justify-center'>
				<h2>Enter the following data here</h2>
				<form className='grid grid-cols-1 w-full gap-2 min-w-0.5'>
					<label
						htmlFor='trade'
						className='text-xs text-center flex flex-col'>
						<span>Trade value</span>
						<input
							className='w-full rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='trade'
							id='trade'
							step='100'
							placeholder='Trade value'
							value={formData.trade}
							onChange={handleInputChange}
							min={100}
							max={50000}
						/>
					</label>
					{errors.trade && <span className='text-error'>{errors.trade}</span>}
					<label
						htmlFor='payoff'
						className='text-xs text-center flex flex-col'>
						<span>Trade payoff</span>
						<input
							className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='payoff'
							id='payoff'
							step='100'
							placeholder='Trade payoff'
							value={formData.payoff}
							onChange={handleInputChange}
						/>
					</label>
					{errors.payoff && <span className='text-error'>{errors.payoff}</span>}
					<label
						htmlFor='price'
						className='text-xs text-center flex flex-col'>
						<span>Vehicle price</span>
						<input
							className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='price'
							id='price'
							placeholder='Vehicle price'
							value={formData.price}
							onChange={handleInputChange}
						/>
					</label>
					<div className='mt-4 rounded-full border border-solid border-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center'>
						<div className='form-control w-full'>
							<label className='label cursor-pointer flex justify-between'>
								<span className='label-text'>LoJack</span>
								<input
									type='checkbox'
									className='checkbox'
									defaultChecked={loJack === 499}
									onChange={handleLoJackChange}
								/>
							</label>
						</div>
					</div>
					<div className='mt-4 rounded-full border border-solid border-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center'>
						<div className='form-control w-full'>
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
					</div>
					<label
						htmlFor='otherAccessory'
						className='text-xs text-center flex flex-col'>
						<span>Other accessories cost</span>
						<input
							className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='otherAccessory'
							id='otherAccessory'
							step='100'
							placeholder='Additional accessories cost'
							value={formData.otherAccessory}
							onChange={handleInputChange}
						/>
					</label>
					<label
						htmlFor='downPayment'
						className='text-xs text-center flex flex-col'>
						<span>Initial cash investment</span>
						<input
							className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='downPayment'
							id='downPayment'
							step='100'
							placeholder='Down payment'
							value={formData.downPayment}
							onChange={handleInputChange}
						/>
					</label>
					<label
						htmlFor='score'
						className='text-xs text-center flex flex-col'>
						<span>Credit score</span>
						<input
							className='rounded-full border border-solid border-transparent transition-colors  bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='score'
							id='score'
							max={999}
							maxLength={3}
							placeholder='Credit score'
							value={formData.score}
							onChange={handleInputChange}
						/>
					</label>
				</form>
				{/* Interest rates */}
				<div className='dropdown dropdown-hover dropdown-top w-full mt-6'>
					<div
						tabIndex={0}
						role='button'
						className='btn rounded-full btn-warning w-full'>
						Interest rates
					</div>

					<div
						tabIndex={0}
						className='dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow'>
						<h5 className='text-base text-center'>Credit-based rates</h5>
						<table className='table table-xs'>
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
							<p>Total with accessories, trade cost and equity: {toCurrency(total)}</p>
						</li>
						<li>
							<p>
								Total + Tax, Title, Licensing and Registration:{' '}
								{toCurrency(totalWithTax)}
							</p>
						</li>
						<li>
							<p>20% down payment: {toCurrency(totalWithTax * 0.2)}</p>
						</li>
						<li>
							<p>10% down payment: {toCurrency(totalWithTax * 0.1)}</p>
						</li>
						<li>
							<p>Interest rate: {(interestRate * 100 - 100).toFixed(2)}</p>
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
							<h3>Without money down:</h3>
						</div>
						<div className='collapse-content'>
							<h3 className='text-lg'>
								Amount to be financed: {toCurrency(totalWithTax)}
							</h3>
							<h4>Short term payments for:</h4>
							<ul>
								<li>
									24 months: {toCurrency(((totalWithTax * interestRate) / 24) * 1.05)}
								</li>
								<li>
									36 months: {toCurrency(((totalWithTax * interestRate) / 36) * 1.05)}
								</li>
							</ul>
							<h4>Long term payments for:</h4>
							<ul>
								<li>
									60 months: {toCurrency(((totalWithTax * interestRate) / 60) * 1.05)}
								</li>
								<li>
									72 months: {toCurrency(((totalWithTax * interestRate) / 72) * 1.05)}
								</li>
								<li>
									84 months: {toCurrency(((totalWithTax * interestRate) / 84) * 1.05)}
								</li>
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
							<h3>With custom money down:</h3>
						</div>
						<div className='collapse-content'>
							<h3 className='text-lg'>
								Amount to be financed: {toCurrency(totalWithDown)}
							</h3>
							<h4>Short term payments for:</h4>
							<ul>
								<li>
									24 months: {toCurrency(((totalWithDown * interestRate) / 24) * 1.05)}
								</li>
								<li>
									36 months: {toCurrency(((totalWithDown * interestRate) / 36) * 1.05)}
								</li>
							</ul>
							<h4>Long term payments for:</h4>
							<ul>
								<li>
									60 months: {toCurrency(((totalWithDown * interestRate) / 60) * 1.05)}
								</li>
								<li>
									72 months: {toCurrency(((totalWithDown * interestRate) / 72) * 1.05)}
								</li>
								<li>
									84 months: {toCurrency(((totalWithDown * interestRate) / 84) * 1.05)}
								</li>
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
							<h3>With 10% money down:</h3>
						</div>
						<div className='collapse-content'>
							<h3 className='text-lg'>
								Amount to be financed: {toCurrency(totalWithTenDown)}
							</h3>
							<h4>Short term payments for:</h4>
							<ul>
								<li>
									24 months:{' '}
									{toCurrency(((totalWithTenDown * interestRate) / 24) * 1.05)}
								</li>
								<li>
									36 months:{' '}
									{toCurrency(((totalWithTenDown * interestRate) / 36) * 1.05)}
								</li>
							</ul>
							<h4>Long term payments for:</h4>
							<ul>
								<li>
									60 months:{' '}
									{toCurrency(((totalWithTenDown * interestRate) / 60) * 1.05)}
								</li>
								<li>
									72 months:{' '}
									{toCurrency(((totalWithTenDown * interestRate) / 72) * 1.05)}
								</li>
								<li>
									84 months:{' '}
									{toCurrency(((totalWithTenDown * interestRate) / 84) * 1.05)}
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
							<h3>With 20% money down:</h3>
						</div>
						<div className='collapse-content'>
							<h3 className='text-lg'>
								Amount to be financed: {toCurrency(totalWithTwentyDown)}
							</h3>
							<h4>Short term payments for:</h4>
							<ul>
								<li>
									24 months:{' '}
									{toCurrency(((totalWithTwentyDown * interestRate) / 24) * 1.05)}
								</li>
								<li>
									36 months:{' '}
									{toCurrency(((totalWithTwentyDown * interestRate) / 36) * 1.05)}
								</li>
							</ul>
							<h4>Long term payments for:</h4>
							<ul>
								<li>
									60 months:{' '}
									{toCurrency(((totalWithTwentyDown * interestRate) / 60) * 1.05)}{' '}
								</li>
								<li>
									72 months:{' '}
									{toCurrency(((totalWithTwentyDown * interestRate) / 72) * 1.05)}
								</li>
								<li>
									84 months:{' '}
									{toCurrency(((totalWithTwentyDown * interestRate) / 84) * 1.05)}
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
