// For using the Servies of Appwrite we created and separate folder so we don't face the problem of vendor lock-in  . This file has Authentication services
// The {AuthService , this.account.create , Client , account , ID } are not the part of the react itself they belongs to the documentation of " AppWrite " - open source backend-as-a-Service app . [So , don't confuse with them ]
 
 
//           INDEPENDENT / REUSABLE CHUNK OF CODE FOR AUTHENTICATION SERVICE [ ihnu hun mein kite bhi use kr skda kite bhi lor peve appwrite di authentication code di lor bs copy-paste karna  ]

import config from "../Config/Config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account ;

   // Object is being created 
   constructor() {
    this.client
        .setEndpoint(config.appwriteURL)        // Your Appwrite URL 
        .setProject(config.appwriteProjectId);  // Your project id 
    this.account = new Account(this.client);    // Account object is being created for authentication services    
    }

    // Creating our own method to use the back-end service so that we can  be vendor-lock in . {Chae , appwrite na chale taah bhi eh method kaam krunga bs is vich values dedo}
    async createAccount({email , password , name }){      // Here , we destructred the items that are passed us in the object ( that are - name , email , password )
      
        try {
          const userAccount =  await this.account.create(
            ID.unique() , email , password , name 
          );
            if (userAccount) {
                // call another method - jis vich je successfully login ho gya teh usnu logIn krva dena application vich sidha ..
                 return this.login({email,password}) ;  // Calling the login method to log in the user after creating the account
                }
            else { 
              throw new Error('Failed to create account');
            }    
        } 

            catch (error) {
           throw error ;

        }
    }

    // Another method 
    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession
            (email,password) ;
        } catch (error) {
            throw error ;
        }
    }


    // Another method / functionality from the Appwrite Services 
    async getCurrentuser () {
        try {
           return await this.account.get();
        } catch (error) {
            throw error ; 
        }
    }

    // Logout method for logging out the account
     async logout () {
        try {
           await this.account.deleteSessions();       // jihne bhi saare bhi sesssions chal rehe hone kisi bhi browser pr oh delete ho jane 
        } catch (error) {
            console.log('Appwrite serive :: logout :: error' , error );
        }
     } 
  } 

const authService = new AuthService();   // Directly exporting the object rather than class as now we can directly access the properties of this object by '.'   

export default authService