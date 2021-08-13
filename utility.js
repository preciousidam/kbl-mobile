import {
	widthPercentageToDP as wp2dp,
	heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
  
  /**
   * Width-Percentage
   * Converts width dimension to percentage
   * 360, 760 - design were made using this scale
   * @param dimension directly taken from design wireframes
   * @returns {string} percentage string e.g. '25%'
   */
export const wp = dimension => {
	const width = Dimensions.get('window').width;
	return wp2dp((dimension / width) * 100 + '%');
};
  
  /**
   * Height-Percentage
   * Converts width dimension to percentage
   * * 360, 760 - design were made using this scale
   * @param dimension directly taken from design wireframes
   * @returns {string} percentage string e.g. '25%'
   */
export const hp = dimension => {
	const height = Dimensions.get('window').height;
	return hp2dp((dimension / height) * 100 + '%');
};

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

export const validUri = image => {
	return typeof image !== 'object'? image : Platform.OS === "android" ? image?.uri : image?.uri.replace("file://", ""); 
}

export const get_file_name = uri => {
  	let filename = uri.split('/').pop();
	protocol = uri.split(':')[0];
	if (protocol === 'https' || protocol === 'http')
		filename += '.jpg';
	return filename;
}


export const get_file_type = image => {
	let match = /\.(\w+)$/.exec(image);
  	let type = match ? `image/${match[1]}` : `image/jpg`;
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
	const fields = [
		'registration_number', 'engine_number', 'chasis_number',
		'vehicle_class', 'vehicle_model', 'vehicle_make', 'vehicle_year',
		'vehicle_color', 'user', 'product', 'value', 'duration', 'referrer',
	]
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
    
    for ( let key of fields ) {
        formData.append(key, body[key]);
	}
	
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
		data = {address: body.address, plan: body.plan, building_type: body.building_type, user: body.user, product: body.product, value: body.value, referrer: body.referrer}

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


