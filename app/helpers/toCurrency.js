export const toCurrency = n => {
	return n.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};
