import { create } from "framer-motion/client";
import config from "../../config/config";
import {Client, Account, ID,Databases,Storage,Query} from "appwrite";
import { use } from "react";

export class Services{ // created a separate class to handle different appwrite services 
    client=new Client();
    database;
    storage;
    constructor(){
        this.client
            .setEndpoint(config.appwriteurl)
            .setProject(config.appwriteprojectid);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({Title, Content, Image, User_ID,Status,Slug}) { // method to create a new post
try{
return await this.database.createDocument(
    config.appwritedatabaseid,
    config.appwritecollectionid,
    Slug,
    {
        Title,
        Content,
        Image,
        Status,
        User_ID,
        Slug,
    }
)
}
catch (error) {
            throw error;
        }
    }
    async updatePost(slug,{Title, Content, Image,User_ID,Status}) { // method to update an existing post
        try{
return await this.database.updateDocument(
            config.appwritedatabaseid,
            config.appwritecollectionid,
            slug,
            {
                Title,
                Content,
                Image,
                User_ID,
                Status
            }
        )
        }
        catch (error) {
            throw error;
        }
    }
    async deletePost(slug){
        try{
            await this.database.deleteDocument(
            config.appwritedatabaseid,
            config.appwritecollectionid,
            slug
        )
        return true;// if we successfully delete the post we will handle it in frontend
        }
        catch (error) {
            throw error;
            return false;// if not then return false
        }
    }
    async getPost(slug){
        // if(slug===":slug")slug="slug";//done due to we fixed the route and if no documnet is present then the slug would be :slug hence not valid for appwrite
        try{
            return await this.database.getDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug
            )
        }
        catch(error) {
            throw error;
            return false;
        }   
    }
    async getPosts(queries=[Query.equal("Status", "active")]) { // method to get all posts with optional filters
        try{
            return await this.database.listDocuments(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                queries
            );
        } // method to get all posts with optional filters
        catch (error) {
            throw error;
        }
}
async getLimitedPosts(limit = 5, queries = [Query.equal("Status", "active"), Query.limit(limit)]) {
  try {
    return await this.database.listDocuments(
      config.appwritedatabaseid,
      config.appwritecollectionid,
      queries
    );
  } catch (error) {
    throw error;
  }
}
async getUserposts(userid,queries=[Query.equal("User_ID", userid)]) { // method to get all posts of a specific user
    try{
        return await this.database.listDocuments(
            config.appwritedatabaseid,
            config.appwritecollectionid,
            queries
        );
    }
    catch (error) {
        throw error;
    }
}
// now for upploading files service
async uploadFile(file) { // method to upload a file
    try {
        return await this.storage.createFile(
            config.appwritebucketid,
            ID.unique(),
            file
        );
    } catch (error) {
        throw error;
        return false;
    }
}
async deletefile(fileId){
    try{
await this.storage.deleteFile(
        config.appwritebucketid,
        fileId
    );
    return true; // if we successfully delete the file we will handle it in frontend
    }
    catch (error) {
        throw error;
        return false;// if not then return false
    }
}
getfileUrl(fileId) { // method to get the URL of a file
    return this.storage.getFileView(
        config.appwritebucketid,
        fileId
    );
}
//-----------------User Database services-----------------//
async createUser($id,Username,email){
    try{
  return this.database.createDocument(
    config.appwriteuserinfoDatabaseid,
    config.appwriteuserinfocollectionid,
       $id,
        {
            Username,
            email,
        }
    );
    }
    catch(error){
        throw error;
    }
}
async getUser($id){
    try{
    return this.database.getDocument(
        config.appwriteuserinfoDatabaseid,
        config.appwriteuserinfocollectionid,
        $id
    );
    }
    catch(error){
        throw error;
    }
}
async updateUser($id,Username,Image,Blogs,email){
    try{
    return this.database.updateDocument(
        config.appwriteuserinfoDatabaseid,
        config.appwriteuserinfocollectionid,
        $id,
        {
            Username,
            Image,
            Blogs,
            email
        }
    );
    }
    catch(error){
        throw error;
    }
}
}
const services=new Services();
export default services;
