export const getInterestRate = score => {
	if (score <= 549) {
		return 1.18;
	} else if (score <= 599 && score >= 550) {
		return 1.155;
	} else if (score <= 639 && score >= 600) {
		return 1.115;
	} else if (score <= 679 && score >= 640) {
		return 1.085;
	} else if (score <= 729 && score >= 680) {
		return 1.0725;
	} else if (score >= 730) {
		return 1.0675;
	} else {
		return 1.18;
	}
};
