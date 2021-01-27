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
	
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date(expiry.split('-').reverse().join('-'));
	const secondDate = new Date();
	
	const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
	

	if (diffDays < 30 && firstDate > secondDate) return 1;
	else if (diffDays > 30 && firstDate > secondDate) return 2;
	else if (diffDays > 0 && firstDate < secondDate) return 0
}

export const motorFormData = body => {
	let formData = new FormData();
    formData.append("back_image", 
        {name: "one.jpg",
        type: `${body.back_image?.type}/jpeg`, extension: 'jpg', ext: 'jpg',
        uri: Platform.OS === "android" ? body.back_image?.uri : body.back_image?.uri.replace("file://", ""),
    }, body.back_image?.uri?.split('/')[body.back_image?.uri?.split('.').length - 1]);
    formData.append("front_image", 
        {name: "one.jpg",
        type: `${body.front_image?.type}/jpeg`, extension: 'jpg', ext: 'jpg',
        uri: Platform.OS === "android" ? body.front_image?.uri : body.front_image?.uri.replace("file://", "")
    }, body.front_image?.uri?.split('/')[body.front_image?.uri?.split('.').length - 1])
    formData.append("vehicle_license", 
        {name: "one.jpg",
        type: `${body.vehicle_license?.type}/jpeg`, 
        extension: 'jpg', ext: 'jpg',
        uri: Platform.OS === "android" ? body.vehicle_license?.uri : body.vehicle_license?.uri.replace("file://", "")
    }, body.vehicle_license?.uri?.split('/')[body.vehicle_license?.uri?.split('.').length - 1])
    formData.append("proof_of_ownership", 
        {name: "one.jpg",
        type: `${body.proof_of_ownership?.type}/jpeg`, extension: 'jpg', ext: 'jpg',
        uri: Platform.OS === "android" ? body.proof_of_ownership?.uri : body.proof_of_ownership?.uri.replace("file://", "")
    },body.proof_of_ownership?.uri?.split('/')[body.proof_of_ownership?.uri?.split('.').length - 1])
    console.log(formData)
    for ( let key in body ) {
        if (key != "back_image" && key != "proof_of_ownership" && key != "vehicle_license" && key != "front_image" )
            formData.append(key, body[key]);
	}
	
	return formData;
}