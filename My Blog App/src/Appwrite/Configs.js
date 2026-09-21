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

    getFileId(fileValue) {
        if (!fileValue) {
            return '';
        }

        if (typeof fileValue === 'object') {
            return fileValue.$id || fileValue.fileId || fileValue.id || '';
        }

        return String(fileValue);
    }

    normalizeRow(row) {
        if (!row) return null;

        if (row.data && typeof row.data === 'object' && !Array.isArray(row.data)) {
            const normalized = {
                ...row.data,
                $id: row.$id,
                $tableId: row.$tableId,
                $databaseId: row.$databaseId,
                $createdAt: row.$createdAt,
                $updatedAt: row.$updatedAt,
                $permissions: row.$permissions || [],
            };

            if (normalized.featuredImage) {
                normalized.featuredImage = this.getFileId(normalized.featuredImage);
            }

            return normalized;
        }

        if (row.featuredImage) {
            row.featuredImage = this.getFileId(row.featuredImage);
        }

        return row;
    }
   
// Method to create a Blog Post 
async createPost ({ title, slug, content, featuredImage = '', status = 'active', userId, image, ...rest }){

    try {
        const rowId = ID.unique();
        const safeSlug = String(slug || title || 'post')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 36) || 'post';

        const validData = {
            title,
            slug: safeSlug,
            content,
            featuredImage,
            status,
            userId,
        };

        return await this.tables.createRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId,
            data: validData,
        });
    } catch (error) {
        console.error('Appwrite service :: createPost :: error' , error )
        throw error;
    }

}

// Method to update the Post 
async updatePost (slug , {title , slug: updatedSlug, content , featuredImage = '', status }){
    
    try {

        return await this.tables.updateRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
            data: { title, slug: updatedSlug || slug, content, featuredImage, status },
        });

    }
       catch (error) {
        console.log('Appwrite service :: updatePost :: error' , error )
        return false;
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
        if (!slug) {
            return false;
        }

        const response = await this.tables.listRows({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            queries: [Query.equal('slug', slug)],
        });

        return this.normalizeRow(response?.rows?.[0]) || false;
    } catch (error) {
        console.log(' Appwrite serive :: getPost :: error' , error );
        try {
            const row = await this.tables.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
            });
            return this.normalizeRow(row) || false;
        } catch (fallbackError) {
            console.log(' Appwrite serive :: getPost :: fallback error' , fallbackError );
            return false;
        }
    }
  }

  // Queries on database . Because to get all the posts in the table to showcase all the them on the blog app . { we used queries because we want only the specific post whose status are active }
  async getPosts (queries = [ Query.equal('status', 'active' ) ]  ) {

    try {
        const safeQueries = Array.isArray(queries) ? queries : [ Query.equal('status', 'active') ];
        const response = await this.tables.listRows({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            queries: safeQueries,
        });

        const rows = response?.rows ?? response?.documents ?? [];
        return rows.map((row) => this.normalizeRow(row)).filter(Boolean);
    } catch (error) {
        console.log(' Appwrite serive :: getPosts :: error' , error );
        return [];
    }
  }

   // FILE UPLOADING SERVICES 
  // File upload service  
  async uploadFile(file){

    try {
        if (!file) {
            return false;
        }

        return await this.bucket.createFile({
            bucketId: config.appwriteBucketId,
            fileId: ID.unique(),
            file,
            permissions: ["read(\"any\")"],
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


getFileView(fileId) {
    const normalizedFileId = this.getFileId(fileId);

    if (!normalizedFileId) {
        return '';
    }

    return this.bucket.getFileView({
        bucketId: config.appwriteBucketId,
        fileId: normalizedFileId,
    });
}

// Method to preview the file . This is the feature given by the appWrite Service whose response is very fast 
getFilePreview(fileId){
    const normalizedFileId = this.getFileId(fileId);

    if (!normalizedFileId) {
        return '';
    }

    return this.bucket.getFilePreview({
        bucketId: config.appwriteBucketId,
        fileId: normalizedFileId,
        width: 1200,
        height: 700,
        quality: 90,
    });
}

  }






const service = new Service()
export default service