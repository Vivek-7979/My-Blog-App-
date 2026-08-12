// For using the Servies of Appwrite we created and separate folder so we don't face the problem of vendor lock-in  . This file has Authentication services
// The {AuthService , this.account.create , Client , account , ID } are not the part of the react itself they belongs to the documentation of " AppWrite " - open source backend-as-a-Service app . [So , don't confuse with them ]

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
          const userAccount =  await this.account.create
            (ID.unique() , email , password , name ) ;
            if (userAccount) {
                // call another method - jis vich je successfully login ho gya teh usnu logIn krva dena application vich sidha ..
                 return this.login({email,password}) ;  // Calling the login method to log in the user after creating the account
                }
            else { return userAccount }    
        } 

            catch (error) {
           throw error ;

        }
    }

    // Another method 
    async login({email,password}) {
        try {
            return await this.account.createEmailSession
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

        return null ; // account miliya hi nhi 
    }
} 

const authService = new AuthService();   // Directly exporting the object rather than class as now we can directly access the properties of this object by '.'   