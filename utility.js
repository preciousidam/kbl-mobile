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

export const isNewPolicy = created_at => {
	
	
	const firstDate = new Date(created_at);
	const secondDate = new Date();
	
	let diff =(secondDate.getTime() - firstDate.getTime()) / 1000;
	diff /= 60;
	const mins = Math.abs(Math.round(diff));
	
	return mins <= 30 ? true : false;
}

const validUri = image => {
	return typeof image !== 'object'? image : Platform.OS === "android" ? image?.uri : image?.uri.replace("file://", ""); 
}

const get_file_name = uri => {
  	let filename = uri.split('/').pop();
	return filename;
}


const get_file_type = image => {
	let match = /\.(\w+)$/.exec(image);
  	let type = match ? `image/${match[1]}` : `image`;
	return type;
}

const image_from_base64 = async (image, name, type) => {
	const res = await fetch(`data:${type};base64,${image.base64}`);
	const blob = await res.blob()
	const file = File([blob],name, {type})
	console.log(file)
	return file;
}

export const motorFormData = async body => {
	let formData = new FormData();

	if (body?.back_image){
		
		let uri = validUri(body.back_image)
		let name = get_file_name(uri)
		let type = get_file_type(name)
		formData.append("back_image", {name,type,uri})
	}
	
	if (body?.front_image){
		let uri = validUri(body.front_image)
		let name = get_file_name(uri)
		let type = get_file_type(name)
		formData.append("front_image", {name,type,uri})
	}

	if (body?.vehicle_license){
		let uri = validUri(body.vehicle_license)
		let name = get_file_name(uri)
		let type = get_file_type(name)
		formData.append("vehicle_license", {name,type,uri})
	}
	
	if (body?.proof_of_ownership){
		let uri = validUri(body.proof_of_ownership)
		let name = get_file_name(uri)
		let type = get_file_type(name)
		formData.append("proof_of_ownership", {name,type,uri})
	}
    
    for ( let key in body ) {
        if (key != "back_image" && key != "proof_of_ownership" && key != "vehicle_license" && key != "front_image" )
            formData.append(key, body[key]);
	}
	console.log('formdata', formData)
	return formData;
}

export const motorClaimData = body => {
	let formData = new FormData();

	if (body?.witness_signature){
		formData.append("back_image", 
			{name: "one.jpg",
			type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
			uri: validUri(body.witness_signature),
		});
	}
	
	
    
    for ( let key in body ) {
        if (key != "witness_signature" && key != "injureds" )
            formData.append(key, body[key]);
	}
	
	return formData;
}


export const kycFormData = body => {
	let formData = new FormData();
	let signature;
	let id_image;
	if(body.id_image){
		id_image = {name: "one.jpg",
							type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
							uri: validUri(body.id_image),
						};
	}
	if(body.signature){
		signature = {name: "one.jpg",
							type: `image/jpeg`, extension: 'jpg', ext: 'jpg',
							uri: validUri(body.signature)
						};

	}
    formData.append("id_image", id_image);
    formData.append("signature",signature);
    
    
    for ( let key in body ) {
        if (key != "id_image" && key != "signature")
            formData.append(key, body[key]);
	}
	
	return formData;
}

export const validateCard = ({cardno,cvv,pin,expiryyear, expirymonth}) => {
	return (cardno && cvv && pin && expiryyear && expirymonth);
}


export const filterData = (category, body)=> {
	let data;
	if (category === 'Home'){
		data = {address: body.address, plan: body.plan, building_type: body.building_type, user: body.user, product: body.product, value: body.value}

		if ('items' in body){
			let hold = {}
			for (let item in body.items){
				if (body.items[item].item == '' || body.items[item].value == '') continue
				else hold[item] = body.items[item]
			}
			data['items'] = hold;
		}
		return data
	}
	else if (category === 'Motor'){
		data = {...body};
		delete data.address;
		delete data.plan;
		delete data.building_type;

		if ('items' in data){
			delete data.items;
		}
		return data
	}
}

export const isValidEmail = email => {

	let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	
	return regEmail.test(email);
}

export const isValidPassword = password => {
	
	let regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/
	
	return regPassword.test(password);
}