import config from "../Config/Config";

import { Client, ID, Query, Storage, TablesDB } from "appwrite";

export class Service {

    client = new Client();
    tables;
    bucket; 
    
    constructor(){
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectId);
        this.tables = new TablesDB(this.client);
        this.bucket = new Storage (this.client); }
   
// Method to create a Blog Post 
async createPost ({title , slug , content , featuredImage , status , userId }){

    try {
        return await this.tables.createRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
            data: { title, content, featuredImage, status, userId },
        });
    } catch (error) {
        console.log('Appwrite service :: createPost :: error' , error )
    }

}

// Method to update the Post 
async updatePost (slug , {title , content , featuredImage, status , }){
    
    try {

        return await this.tables.updateRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
            data: { title, content, featuredImage, status },
        });

    }
       catch (error) {
        console.log('Appwrite service :: updatePost :: error' , error )
        }

}


// Method to delete the post 
async deletePost (slug) {
     
     
    try {

        await this.tables.deleteRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
        });
        return true    

    }
       catch (error) {
        console.log('Appwrite service :: deletePost :: error' , error );
        return false 
        }

}

// Method to get the [ one specific-post ]  . Particular blog post  
async getPost(slug){
    try {
        return await this.tables.getRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
        });
    } catch (error) {
        console.log(' Appwrite serive :: getPost :: error' , error );
        return false 
    }
  }

  // Queries on database . Because to get all the posts in the table to showcase all the them on the blog app . { we used queries because we want only the specific post whose status are active }
  async getPosts (queries = [ Query.equal('status', 'active' ) ]  ) {  // this queries argument and all thing is the part of the appwrite . And this is written in appwrite's document . So , don't worry about it as it is the part of the appwrite documentation

    try {
        return await this.tables.listRows({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            queries,
        });
    } catch (error) {
        console.log(' Appwrite serive :: getPosts :: error' , error );
        return false 
    }
  }

   // FILE UPLOADING SERVICES 
  // File upload service  
  async uploadFile(file){

    try {
        return await this.bucket.createFile({
            bucketId: config.appwriteBucketId,
            fileId: ID.unique(),
            file,
        });
        
    } catch (error) {
        console.log('Appwrite service :: uploadFile :: error ' , error );
        return false 
    }
  }


// Delete File Service (Method) . This all syntax / structure is written in the documentation of the Appwrite . We Have to read the documentation of the appwrite to implement the code  
async deleteFile(fileId){

    try {
        await this.bucket.deleteFile({
            bucketId: config.appwriteBucketId,
            fileId,
        });
        return true

    } 
    catch (error) {
        console.log('Appwrite Service :: DeleteFile :: error' , error);
        return false 
    }

}


// Method to preview the file . This is the feature given by the appWrite Service whose response is very fast 
getFilePreview(fileId){
    return this.bucket.getFilePreview({
        bucketId: config.appwriteBucketId,
        fileId,
    });
}

  }






const service = new Service()
export default service