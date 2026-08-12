const config ={

    // importing all the environment variable from .env file and stroing it in the object once 

appwriteURL :          String(import.meta.env.VITE_APPWRITE_URL),
appwriteProjectId :    String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
appwriteDatabaseId :   String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
appwriteBucketId :     String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}


export default config;