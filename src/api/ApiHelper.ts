import {APIRequestContext} from "@playwright/test";

export class ApiHelper{

    private readonly request:APIRequestContext;
    private readonly baseURL:string;

    constructor(request:APIRequestContext,baseURL:string){
        this.request=request;
        this.baseURL=baseURL;
    }

    //GET
    async get(endpoint:string,headers?:Record<string,string>){
        console.log(`URL: ${this.baseURL}${endpoint}`);
        let response=await this.request.get(`${this.baseURL}${endpoint}`,{
            headers:headers
        });
        console.log("GET Response: ",await response.json());
        return{
            status:response.status(),
            body:await response.json()
        }
    }

    async post(endpoint:string,data:object,headers?:Record<string,string>){

        let response=await this.request.post(`${this.baseURL}${endpoint}`,{
            data:data,
            headers:headers
        });
        console.log("POST Response: ",await response.json());
        return{
            status:response.status(),
            body:await response.json()
        }
    }

    async put(endpoint:string,data:object,headers?:Record<string,string>){
       let response=await this.request.put(`${this.baseURL}${endpoint}`,{
            headers:headers,
            data:data
        });
        console.log("PUT Response: ",await response.json());
        return{
            status:response.status(),
            body:await response.json()
        }
    }

    async delete(endpoint:string,headers?:Record<string,string>){
       let response=await this.request.delete(`${this.baseURL}${endpoint}`,{
            headers:headers,
        });
        console.log("DELETE Response: ",response.status());
        return{
            status:response.status()
        }
    }



}