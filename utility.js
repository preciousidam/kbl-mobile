export function CommaFormatted(amount) {
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}

export const checkExpiry = expiry => {
	console.log(expiry.split('-').reverse().join('-'))
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date(expiry.split('-').reverse().join('-'));
	const secondDate = new Date();
	console.log(firstDate)
	console.log(secondDate)
	const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
	console.log(diffDays)

	if (diffDays < 30 && firstDate > secondDate) return 1;
	else if (diffDays > 30 && firstDate > secondDate) return 2;
	else if (diffDays > 0 && firstDate < secondDate) return 0
}