import axios from "axios";
import until from "./until";
import { useAuthStore } from "@/stores/users.store";
export default  class ConnectSever{
	static APP_API_URL=(process.env.VUE_APP_API_URL);
	public static timesession:number=(process.env.VUE_APP_API_TIME||0) as number;
	static getURL(url:string):string {
		return (url.indexOf("http://")>-1&&url.indexOf("https://"))
			?url
			:ConnectSever.APP_API_URL+url
		;
	}

	static validSession() {
		const authStore = useAuthStore();
        const endTimeSession:number=authStore.endTimeSession;
        const token:number=authStore.token;
		let result= (
			(
				!(token)
				&&!(endTimeSession)
				&&(endTimeSession! as number)>(new Date()).getTime()
			)
		)
		if(result){
			let renoveTimeSession:number=(new Date()).getTime()+ConnectSever.timesession as number;
			authStore.endTimeSession=renoveTimeSession;
		}
		else{
			authStore.logout()
		}
		return result;
	}

	static getHeader():Object{
		const authStore = useAuthStore();
		return {
			Authorization: "Bearer "+authStore.token,
			"content-type":"application/json",
		}
	}

	static async get(url:string,data?:object,headers?:object):Promise<any>{
		let result=null;
		let params=(data)?"?"+Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&'):"";
		if(!headers)
			headers=ConnectSever.getHeader();
		await  axios.get(
			ConnectSever.getURL(url)+params,
			{	
				headers:headers,
			}
		).then(response => {
			result= response
		}).catch(function (error) {
			if (error.response) {
				// Request made and server responded
				throw Error(
					"data: "+JSON.stringify(error.response.data)+"\n"+
					"status: "+error.response.data+"\n"+
					"headers: "+error.response.headers
				);
			} else if (error.request) {
				// The request was made but no response was received
				throw Error(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				throw Error(error.message);
			}
		});	
		return result;
	}	

	static async  post(url:string,data?:object,headers?:object,callbackProgress?:Function):Promise<any>{
		let result=null;
		if(!headers)
			headers=ConnectSever.getHeader();
		await  axios.post(
			ConnectSever.getURL(url),data,
			{	
				onUploadProgress: (event) => {
					let progress = (event.total)
                        ?Math.round(
                        (event.loaded * 100) / event.total! as number
                        )
                        :0;
					if(callbackProgress)
					callbackProgress(progress)
				},
				headers:headers,
				data:data,
			}
		)
		return result;
	}	

	static async  put(url:string,data?:object,headers?:object,callbackProgress?:Function):Promise<any>{
		let result=null;
		if(!headers)
			headers=ConnectSever.getHeader();
		await  axios.put(
			ConnectSever.getURL(url),data,
			{	
				onUploadProgress: (event) => {
					let progress = (event.total)
                        ?Math.round(
                        (event.loaded * 100) / event.total! as number
                        )
                        :0;
					if(callbackProgress)
					callbackProgress(progress)
				},
				headers:headers,
				data:data,
			}
		)
		return result;
	}	
	
	static async delete(url:string,data?:object,headers?:object):Promise<any>{
		let result=null;
		let params=(data)?"?"+Object.entries(data).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&'):"";
		if(!headers)
			headers=ConnectSever.getHeader();
		await  axios.delete(
			ConnectSever.getURL(url)+params,
			{	
				headers:headers,
			}
		).then(response => {
			result= response
		}).catch(function (error) {
			if (error.response) {
				// Request made and server responded
				throw Error(
					"data: "+JSON.stringify(error.response.data)+"\n"+
					"status: "+error.response.data+"\n"+
					"headers: "+error.response.headers
				);
			} else if (error.request) {
				// The request was made but no response was received
				throw Error(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				throw Error(error.message);
			}
		});	
		return result;
	}	
}