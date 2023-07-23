import type { User } from "../model/user";
import type { PaginationResponse } from "../interfaces/server-response";
import type { serverResponse } from "../interfaces/server-response";
import  ConnectSever  from "../until/connect-server";
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SessionData } from "../model/session-data";

export const userStore = defineStore('userActive', () => {
  let user = ref(0)
  function increment() {
    
  }
  return { user,  increment }
})

export default  class UserService{
    static async auth(email:string,password:string):Promise<serverResponse<SessionData>> {
        const data={
        "email": email,
        "password": password,
        }
        try{
            const result=await ConnectSever.post('/login',data,undefined,undefined);	
            let endTimeSession=(new Date()).getTime()+ConnectSever.timesession;
            if(!result.data.token){
                localStorage.setItem("userToken",result.data.token);
                localStorage.setItem("endTimeSession",endTimeSession.toString());
            }
            else{
                localStorage.setItem('userToken',"");
                localStorage.setItem("endTimeSession","");
                localStorage.removeItem('userToken');
                localStorage.removeItem("endTimeSession");
            }
            return result.data; 
        }catch(e){
            localStorage.setItem('userToken',"");
            localStorage.setItem("endTimeSession","");
            localStorage.removeItem('userToken');
            localStorage.removeItem("endTimeSession");
            throw Error("Erro ao entrar no sistema");
        }
    } 

    static async findById(id:string):Promise<serverResponse<User>>{
        return (await ConnectSever.get(`/users/${id}`,undefined,undefined)).data;
    }

    static async findAll(id:string):Promise<PaginationResponse<User>>{
        return (await ConnectSever.get(`/users/${id}`,undefined,undefined)).data;
    }

    static async save(data:User):Promise<serverResponse<User>>{
        if(data?.id) return UserService.update(data.id,data);
        else return UserService.create(data);
    }

    static async create(data:User):Promise<serverResponse<User>>{
        return (await ConnectSever.post(`/users`,data,undefined)).data;
    }

    static  async update(id:string,data:User){
        return (await ConnectSever.put(`/users/${id}`,data,undefined)).data;
    } 

    static  async  delete(id:string){
        return (await ConnectSever.delete(`/users/${id}`,undefined,undefined)).data;
    }
}




