import config from "../Config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });

            if (userAccount) {
                return this.login({ email, password });
            }

            throw new Error('Failed to create account');
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });
        } catch (error) {
            throw error;
        }
    }

    async getCurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error?.code !== 401) {
                console.error('AuthService :: getCurrentuser :: error', error);
            }
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log('Appwrite serive :: logout :: error', error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;