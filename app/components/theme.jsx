'use client';
import React, { useState, useEffect } from 'react';

const ThemeController = () => {
	const getSavedTheme = () => {
		if (typeof window !== 'undefined') {
			const storedTheme = localStorage.getItem('isDark');
			return storedTheme === 'true';
		}
		return false;
	};

	const [isDark, setIsDark] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		localStorage.setItem('isDark', newTheme);
	};

	useEffect(() => {
		const root = document.documentElement;
		const savedTheme = getSavedTheme();
		setIsDark(savedTheme);
		setIsMounted(true);

		if (savedTheme) {
			root.style.setProperty('--background', 'rgba(3, 15, 22, 0.648)');
			root.style.setProperty('--foreground', '#727346');
			root.style.setProperty('--textColor', '#fdb808');
			root.style.setProperty('--accordeon', '#03220c');
		} else {
			root.style.setProperty('--background', 'rgba(15, 72, 105, 0.648)');
			root.style.setProperty('--foreground', '#025d1d');
			root.style.setProperty('--textColor', '#fdb808');
			root.style.setProperty('--accordeon', '#03220c2d');
		}
	}, [isDark]);

	return (
		<div>
			{isMounted && (
				<label className='flex cursor-pointer gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<circle
							cx='12'
							cy='12'
							r='5'
						/>
						<path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
					</svg>
					<input
						type='checkbox'
						checked={isDark}
						onChange={toggleTheme}
						className='toggle theme-controller'
					/>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
					</svg>
				</label>
			)}
		</div>
	);
};

export default ThemeController;
