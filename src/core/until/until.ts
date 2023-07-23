export default class until{
	static formatLeftZero(num:string, size:number) {
		 num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
	static uuid() {
		function randomDigit() {
		
			if (crypto && crypto.getRandomValues) {
				let rands = new Uint8Array(1);
				crypto.getRandomValues(rands);
				return (rands[0] % 16).toString(16);
			} else {
				return ((Math.random() * 16) | 0).toString(16);
			}
		}
		let crypto = window.crypto ;
		return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
	}
	static isInt(val:any){
		let result =false;
		try{
			parseInt(val, 10)
			result=!until.isEmpty(val);
		}
		catch(e){}
		return result;
	}
	static  isEmpty(val:any){
		return (val == '' || val === undefined || val == null || val.length <= 0) ? true : false;
	}
	static arrayAllElementsIsEmpy(array:any[]){
		let count=0
		array.forEach((element,index) => {
			if(this.isEmpty(element)){
				count=count+1;
			}
		});
		return (count===array.length);
	}
	static formatMoney(val:string){
		return "R$ "+parseFloat(val).toFixed(2).replace('.',',');
	}
	static formatMoneyEuro(val:string){
		return parseFloat(val).toFixed(2).replace('.',',')+" €";
	}
	static  usernameIsValid(userName:string) {
		/*start whith letter accept only letter and number */
		let re = /[^\s]\w\w[^\s]+/||/[^\s]\w\d[^\s]+/g;
		return re.test(userName);
	}
	static  lowerCaseOneOrMore(text:string){
		let re = /[a-z]+/;
        return re.test(text);
	}
	static upperCaseOneOrMore(text:string){
		let re = /[A-Z]+/;
        return re.test(text);
	}
	static  numberOneOrMore(text:string){
		let re = /[0-9]+/;
        return re.test(text);
	}
	static emailIsValid(email:string){
		let re = /\S+@\S+\.\S+/;
        return re.test(email);
	}
	static phoneIsValid(phone:string){
		let re = /\([0-9]{2,2}\)\s[0-9]{4,5}-?[0-9]{4}/g;
        return re.test(phone);
	}
	static formatPhoneNumber(phoneNumberString:string):string|null {
		let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
		let match:string[]|null = [];
		if(cleaned.length==10){
			match=cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)
		}
		else if(cleaned.length==11){
			match=cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)
		}
		if (match) {
		  return '(' + match[1] + ') ' + match[2] + '-' + match[3]
		}
		return null
	}  
	static  zipCodeBrasilianIsValid(code:string){
		let re = /[0-9]{5}-?[0-9]{3}/g;
        return re.test(code);
	}

	static passwordIsValid(password:string){
		let re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
        return re.test(password);
	}

	static parseJwt (token:string) {
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		return JSON.parse(jsonPayload);
	};

	static setCookie(cname:string, cvalue:any, exdays:number) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	static getCookie(cname:string) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	static retira_acentos(str:string) 
	{

		let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";

		let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
		let	novastr="";
			for(let i=0; i<str.length; i++) {
				let troca=false;
				for (let a=0; a<com_acento.length; a++) {
					if (str.substr(i,1)==com_acento.substr(a,1)) {
						novastr+=sem_acento.substr(a,1);
						troca=true;
						break;
					}
				}
				if (troca==false) {
					novastr+=str.substr(i,1);
				}
			}
			novastr= novastr.replace(/[^a-zA-Z0-9 ]/g, '');
			novastr= novastr.replace(' ', '_');
			return novastr.replace(/[^a-zA-Z0-9 ]/g, '');
	}       

}