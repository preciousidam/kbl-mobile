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
const validUri = image => {
	return typeof image !== 'object'? image : Platform.OS === "android" ? image?.uri : image?.uri.replace("file://", ""); 
}
export const motorFormData = body => {
	let formData = new FormData();

	if (body.back_image){
		formData.append("back_image", 
			{name: "one.jpg",
			type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
			uri: validUri(body.back_image),
		});
	}
	
	if (body.front_image){
		formData.append("front_image", 
			{name: "one.jpg",
			type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
			uri: validUri(body.front_image)
		})
	}

	if (body.vehicle_license){
		formData.append("vehicle_license", 
			{name: "one.jpg",
			type: `image/jpeg`, 
			extension: 'jpg', ext: 'jpg',
			uri: validUri(body.vehicle_license)
		})
	}
	
	if (body.proof_of_ownership){
		formData.append("proof_of_ownership", 
			{name: "one.jpg",
			type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
			uri: validUri(body.proof_of_ownership)
		})
	}
    
    for ( let key in body ) {
        if (key != "back_image" && key != "proof_of_ownership" && key != "vehicle_license" && key != "front_image" )
            formData.append(key, body[key]);
	}
	
	return formData;
}

export const kycFormData = body => {
	let formData = new FormData();
	let id_image = {name: "one.jpg",
						type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
						uri: validUri(body.id_image),
					};
	let signature = {name: "one.jpg",
						type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
						uri: validUri(body.signature)
					};


    formData.append("id_image", id_image);
    formData.append("signature",signature);
    
    
    for ( let key in body ) {
        if (key != "id_image" && key != "signature")
            formData.append(key, body[key]);
	}
	console.log(formData)
	return formData;
}

export const validateCard = ({cardno,cvv,pin,expiryyear, expirymonth}) => {
	return (cardno && cvv && pin && expiryyear && expirymonth);
}