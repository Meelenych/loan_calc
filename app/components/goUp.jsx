export default function GoUp() {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			<button
				onClick={scrollToTop}
				className='sm:hidden mt-5 p-3 font-normal btn rounded-lg btn-outline hover:bg-slate-600 w-full sm:w-1/5'>
				↑ Go up
			</button>
		</>
	);
}
