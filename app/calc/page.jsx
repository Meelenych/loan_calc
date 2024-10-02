import React from 'react';

const CalcPage = () => {
	return (
		<div className='w-1/4 flex items-center justify-center'>
			<form
				action='submit'
				className='grid grid-cols-1 gap-4'>
				<input
					type='number'
					name='trade'
					id='trade'
				/>
				<input
					type='number'
					name='payoff'
					id='payoff'
				/>
				<input
					type='number'
					name='price'
					id='price'
				/>
				<input
					type='number'
					name='otherAccessory'
					id='otherAccessory'
				/>
				<input
					type='number'
					name='downPayment'
					id='downPayment'
				/>
				<button className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'>
					Calculate
				</button>
			</form>
		</div>
	);
};

export default CalcPage;
