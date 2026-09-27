import config from "../Config/Config";
import { Client, Account, ID } from "appwrite";

let currentUserRequest = null;

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async hasActiveSession() {
        try {
            const user = await this.account.get();
            return Boolean(user);
        } catch (error) {
            return false;
        }
    }

    async createAccount({ email, password, name }) {
        try {
            if (await this.hasActiveSession()) {
                throw new Error('Another session is already running. Please log out first.');
            }

            return await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            });
        } catch (error) {
            if (error?.code === 409 || error?.type === 'user_already_exists') {
                throw new Error('An account with this email already exists. Please log in instead.');
            }

            if (error?.code === 400) {
                throw new Error('Please provide valid sign-up information.');
            }

            throw new Error(error?.message || 'Account creation failed. Please try again.');
        }
    }

    async login({ email, password }) {
        try {
            if (await this.hasActiveSession()) {
                throw new Error('Another session is already running. Please log out first.');
            }

            return await this.account.createEmailPasswordSession({ email, password });
        } catch (error) {
            if (error?.code === 401) {
                throw new Error('Invalid email or password.');
            }

            throw new Error(error?.message || 'Login failed. Please try again.');
        }
    }

    async getCurrentuser() {
        if (currentUserRequest) {
            return currentUserRequest;
        }

        currentUserRequest = (async () => {
            try {
                return await this.account.get();
            } catch (error) {
                const isUnauthenticated = error?.code === 401 || error?.type === 'user_unauthorized';

                if (!isUnauthenticated) {
                    console.error('AuthService :: getCurrentuser :: error', error);
                }

                return null;
            }
        })();

        try {
            return await currentUserRequest;
        } finally {
            currentUserRequest = null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession('current');
            return true;
        } catch (error) {
            console.log('Appwrite serive :: logout :: error', error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService;