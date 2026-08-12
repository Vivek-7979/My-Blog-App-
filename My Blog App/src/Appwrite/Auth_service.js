// For using the Servies of Appwrite we created and separate folder so we don't face the problem of vendor lock-in  . This file has Authentication services

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
            await this.account.create
            (ID.unique() , email , password , name ) ;
            if (userAccount) {
                // call another method - jis vich je successfully login ho gya teh usnu logIn krva dena application vich sidha ..

                }
            else { return userAccount }    
        } 

            catch (error) {
           throw error ;

        }
    }
} 

const authService = new AuthService();   // Directly exporting the object rather than class as now we can directly access the properties of this object by '.'   