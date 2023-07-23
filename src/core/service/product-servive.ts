
import type { Product } from "../model/product";
import type { PaginationResponse } from "../interfaces/server-response";
import type { serverResponse } from "../interfaces/server-response";
import   ConnectSever  from "../until/connect-server";

export default  class ProductService{

    static async findById(id:string):Promise<serverResponse<Product>>{
        return (await ConnectSever.get(`/products/${id}`,undefined,undefined)).data;
    }

    static async findAll(id:string):Promise<PaginationResponse<Product>>{
        return (await ConnectSever.get(`/products/${id}`,undefined,undefined)).data;
    }

    static async save(data:Product):Promise<serverResponse<Product>>{
        if(data?.id) return ProductService.update(data.id,data);
        else return ProductService.create(data);
    }

    static async create(data:Product):Promise<serverResponse<Product>>{
        return (await ConnectSever.post(`/products`,data,undefined)).data;
    }

    static  async update(id:string,data:Product){
        return (await ConnectSever.put(`/products/${id}`,data,undefined)).data;
    } 

    static  async  delete(id:string){
        return (await ConnectSever.delete(`/products/${id}`,undefined,undefined)).data;
    }
}