import config from "../../config/config";
import { Client,Account,ID } from "appwrite";
export class AuthService {// we created a separate class so that whenvever we create an object we can use its methods and create a new account or login or logout
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid)
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {// creating new account and ensuring proper error handling
        try {
            const response = await this.account.create(ID.unique(),email,password,name);
            if (response){
                // call a method because if user already have an account then make it login again
                return await this.Login({email, password});
            }
        else {
            return response;
        }
        } catch (error) {
            console.log("error");
            throw error;
        }
    }
    async Login ({email, password}) {// login method
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
async getuser() {
  // Let this function throw an error if the user is not logged in.
  // The UI component will be responsible for catching it.
  return await this.account.get();
}
    async Logout(){
        try{
            const response = await this.account.deleteSessions();
            return response;
        }
        catch (error) {
            throw error;
    }
}
async updateName(Name){
    try{
         await this.account.updateName(Name);
    }
    catch(error){
        throw error;
    }
}
}
const authservice = new AuthService();
export default authservice;