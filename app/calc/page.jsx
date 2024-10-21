'use client';
import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { toCurrency } from '../helpers/toCurrency';
import { getInterestRate } from '../helpers/getInterestRate';
import { initialFormData } from '../formUtils/initialFormData';
import { fieldLengthLimits } from '../formUtils/fieldLengthLimits';
import back from '../icons/back.svg';
import ThemeController from '../components/theme';

const CalcPage = () => {
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState(initialFormData);
	const [isTrade, setIsTrade] = useState(false);
	const [loJack, setLoJack] = useState(499);
	const [roadHazard, setRoadHazard] = useState(499);
	const [interestRate, setInterestRate] = useState(1.18);
	const [animationClass, setAnimationClass] = useState('inactive');

	const handleTrade = e => {
		setIsTrade(e.target.checked ? true : false);
		setFormData(prevData => ({
			...prevData,
			trade: null,
			payoff: null,
		}));
	};

	const handleLoJackChange = e => {
		setLoJack(e.target.checked ? 499 : 0);
		loJack ? toast.error('LoJack removed') : toast.success('Lojack added');
	};

	const handleRoadHazardChange = e => {
		setRoadHazard(e.target.checked ? 499 : 0);
		roadHazard
			? toast.error('Road Hazard removed')
			: toast.success('Road Hazard added');
	};

	const equity = Number(formData.trade) - Number(formData.payoff);
	const total =
		Number(formData.price) +
		Number(loJack) +
		Number(roadHazard) +
		Number(formData.accessories) -
		equity;

	const totalWithTax = total * 1.12;
	const totalWithDown = totalWithTax - Number(formData.down);
	const totalWithTenDown = totalWithTax - Number(totalWithTax * 0.1);
	const totalWithTwentyDown = totalWithTax - Number(totalWithTax * 0.2);

	const handleInputChange = e => {
		const { name, value } = e.target;
		const relevantFields = ['payoff', 'trade', 'price', 'accessories', 'down'];
		if (fieldLengthLimits[name] && value.length > fieldLengthLimits[name]) {
			return; // Prevent further input if limit is exceeded
		}

		if (relevantFields.includes(name)) {
			// Remove leading zeros, but keep '0' if it's the only input
			const formattedValue = value.replace(/^0+(?=\d)/, '');
			setFormData(prevData => ({ ...prevData, [name]: formattedValue }));
		} else {
			setFormData(prevData => ({ ...prevData, [name]: value }));
		}
		validateFields(name, value);
	};

	useEffect(() => {
		setInterestRate(getInterestRate(formData.score));
	}, [formData]);

	useEffect(() => {
		if (isTrade) {
			setAnimationClass('active');
		}
		if (!isTrade) {
			setAnimationClass('inactive');
		}
	}, [isTrade]);

	const validateFields = (fieldName, value) => {
		let formErrors = { ...errors };

		// Validate the 'trade' field
		if (fieldName === 'trade') {
			if (value < 100 || value > 50000) {
				formErrors.trade = 'Trade value must be between 100 and 50,000';
			} else {
				delete formErrors.trade;
			}
		}

		// Validate the 'payoff' field
		if (fieldName === 'payoff') {
			if (value > 99000) {
				formErrors.payoff = 'Payoff must be less than 99000';
			} else {
				delete formErrors.payoff;
			}
		}

		// Validate the 'price' field
		if (fieldName === 'price') {
			if (value < 1000 || value > 500000) {
				formErrors.price =
					'Price is required and must be between 1,000 and 500,000';
			} else {
				delete formErrors.price;
			}
		}

		// Validate the 'accessories' field
		if (fieldName === 'accessories') {
			if (Number(value) > Number(formData.price)) {
				formErrors.accessories = "Accessories cannot exceed the vehicle's price";
			} else {
				delete formErrors.accessories;
			}
		}

		// Validate the 'down' field
		if (fieldName === 'down') {
			if (Number(value) > Number(formData.price)) {
				formErrors.down = "Down payment cannot exceed the vehicle's price";
			} else {
				delete formErrors.down;
			}
		}

		// Validate the 'score' field
		if (fieldName === 'score') {
			if (value < 250 || value > 900) {
				formErrors.score = 'Credit score value must be between 250 and 900';
			} else {
				delete formErrors.score;
			}
		}

		// Update the errors state
		setErrors(formErrors);

		// Return true if there are no errors
		return Object.keys(formErrors).length === 0;
	};

	return (
		<div className='min-h-screen flex flex-col sm:flex-row justify-evenly items-start gap-5 p-5'>
			<ToastContainer />
			{/* Form */}
			<div className='w-full md:w-1/3 flex flex-col items-center justify-center'>
				{/* Back, theme and trade btns */}
				<div className='grid grid-cols-3 gap-4 w-full mb-8'>
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
					<div className='flex justify-center items-center'>
						<ThemeController />
					</div>
					<div className='flex justify-end items-center'>
						<div className='form-control btn rounded-lg btn-outline hover:bg-slate-600 w-full'>
							<label className='label cursor-pointer'>
								<span className='label-text text-base font-medium text-[#9CA3AF] mr-4'>
									Trade in
								</span>
								<input
									type='checkbox'
									className='checkbox bg-background [--chkbg:--accent] [--chkfg:--background]'
									defaultChecked={isTrade === true}
									onChange={handleTrade}
								/>
							</label>
						</div>
					</div>
				</div>
				{/* Heading */}
				<h2 className='col-span-2 text-lg sm:text-2xl mb-4 underline'>
					Enter your{' '}
					{isTrade && (
						<span>
							{' '}
							<span className='text-orange-600'>old</span> and{' '}
						</span>
					)}
					<span className='text-green-700'>new</span> car info below
				</h2>
				{/* Form inputs */}
				<form className='grid grid-cols-1 w-full gap-2 min-w-0.5'>
					{/* Trade info */}
					{isTrade && (
						<div className={animationClass}>
							{/* Trade cost */}
							<label
								htmlFor='trade'
								className='text-xs text-center flex flex-col mb-2'>
								<span className='mb-1'>Trade value</span>
								<input
									className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
									type='number'
									name='trade'
									id='trade'
									step='100'
									placeholder='Trade value'
									value={formData.trade}
									onChange={handleInputChange}
									onKeyDown={e => e.key === '-' && e.preventDefault()}
									min={100}
									max={50000}
									inputMode='numeric'
								/>
							</label>
							{errors.trade && <span className='text-error'>{errors.trade}</span>}
							{/* Payoff */}
							<label
								htmlFor='payoff'
								className='text-xs text-center flex flex-col'>
								<span className='mb-1'>Trade payoff</span>
								<input
									className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
									type='number'
									name='payoff'
									id='payoff'
									step='100'
									placeholder='Trade payoff'
									value={formData.trade ? formData.payoff || 0 : formData.payoff}
									onChange={handleInputChange}
									min={0}
									max={100000}
									onKeyDown={e => e.key === '-' && e.preventDefault()}
									inputMode='numeric'
								/>
							</label>
						</div>
					)}
					{errors.payoff && <span className='text-error'>{errors.payoff}</span>}
					{/* Price */}
					<label
						htmlFor='price'
						className='text-xs text-center flex flex-col'>
						<span className='mb-1'>Vehicle price</span>
						<input
							className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='price'
							step='1000'
							id='price'
							placeholder='Vehicle price'
							value={formData.price}
							onChange={handleInputChange}
							min={1000}
							max={500000}
							onKeyDown={e => e.key === '-' && e.preventDefault()}
							inputMode='numeric'
						/>
					</label>
					{errors.price && <span className='text-error'>{errors.price}</span>}
					{/* Accessories */}
					<div className='text-center'>
						<p className='text-xs mb-1'>Accessories</p>
						<div className='rounded-lg bg-foreground transition-colors hover:bg-green-700 dark:hover:bg-green-900 h-10 sm:h-12 px-4 sm:px-5 flex items-center'>
							<div className='form-control w-full flex flex-row justify-between'>
								{/* LoJack */}
								<label className='label cursor-pointer flex justify-between'>
									<span className='label-text mr-4 text-base text-background'>
										LoJack
									</span>
									<input
										type='checkbox'
										className='checkbox bg-background [--chkbg:--accent] [--chkfg:--background]'
										defaultChecked={loJack === 499}
										onChange={handleLoJackChange}
									/>
								</label>
								{/* Road hazard */}
								<label className='label cursor-pointer'>
									<span className='label-text mr-4 text-base text-background'>
										Road Hazard
									</span>
									<input
										type='checkbox'
										className='checkbox bg-background [--chkbg:--accent] [--chkfg:--background]'
										defaultChecked={roadHazard === 499}
										onChange={handleRoadHazardChange}
									/>
								</label>
							</div>
						</div>
					</div>
					{/* Other accessories */}
					<label
						htmlFor='accessories'
						className='text-xs text-center flex flex-col'>
						<span className='mb-1'>Other accessories cost</span>
						<input
							className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='accessories'
							id='accessories'
							step='100'
							placeholder='Additional accessories cost'
							value={formData.accessories}
							onChange={handleInputChange}
							min={0}
							max={50000}
							onKeyDown={e => e.key === '-' && e.preventDefault()}
							inputMode='numeric'
						/>
					</label>
					{errors.accessories && (
						<span className='text-error'>{errors.accessories}</span>
					)}
					{/* Down payment */}
					<label
						htmlFor='down'
						className='text-xs text-center flex flex-col'>
						<span className='mb-1'>Actual initial cash investment</span>
						<input
							className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='down'
							id='down'
							step='100'
							placeholder='Down payment'
							value={formData.down}
							onChange={handleInputChange}
							min={0}
							max={500000}
							onKeyDown={e => e.key === '-' && e.preventDefault()}
							inputMode='numeric'
						/>
					</label>
					{errors.down && <span className='text-error'>{errors.down}</span>}
					{/* Credit score */}
					<label
						htmlFor='score'
						className='text-xs text-center flex flex-col'>
						<span className='mb-1'>Credit score</span>
						<input
							className='w-full rounded-lg outline-2 outline-offset-2 outline-green-700 transition-colors bg-foreground text-textColor gap-2 focus:outline hover:bg-green-700 dark:hover:bg-green-900 text-base h-10 sm:h-12 px-4 sm:px-5'
							type='number'
							name='score'
							id='score'
							placeholder='Credit score'
							value={formData.score}
							onChange={handleInputChange}
							min={250}
							max={900}
							onKeyDown={e => e.key === '-' && e.preventDefault()}
							inputMode='numeric'
						/>
					</label>
					{errors.score && <span className='text-error'>{errors.score}</span>}
				</form>
			</div>
			{/* Loan information */}
			<div className='w-full md:w-1/2'>
				{/* General information */}
				<div className='mb-4'>
					<h2 className='text-xl font-medium'>General information</h2>
					<ul>
						{isTrade && (
							<li>
								<p>
									{equity >= 0 ? 'Positive' : 'Negative'} equity: {toCurrency(equity)}
								</p>
							</li>
						)}

						<li>
							<p>
								Total with accessories{isTrade && <span>, trade cost and equity</span>}:{' '}
								{toCurrency(total)}
							</p>
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
					<div className='collapse collapse-arrow join-item bg-accordeon border-green-900 border sm:border-2'>
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
					<div className='collapse collapse-arrow join-item bg-accordeon border-green-900 border sm:border-2'>
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
					<div className='collapse collapse-arrow join-item bg-accordeon border-green-900 border sm:border-2'>
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
					<div className='collapse collapse-arrow join-item bg-accordeon border-green-900 border sm:border-2'>
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
