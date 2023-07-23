import UserService from '@/core/service/user-service';
import ConnectSever from '@/core/until/connect-server';
import router from '@/router';

import { defineStore } from 'pinia';


const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')||""),
        token: JSON.parse(localStorage.getItem('token')||""),
        endTimeSession: JSON.parse(localStorage.getItem('endTimeSession')||""),
        returnUrl: null
    }),
    actions: {
        async login(email:string,password:string) {
            const user = (await UserService.auth(email,password)).data?.user;
            const token = (await UserService.auth(email,password)).data?.token;
            const endTimeSession=(new Date()).getTime()+ConnectSever.timesession;
            // update pinia state
            this.user = user;
            this.token = token;
            this.endTimeSession = endTimeSession;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('endTimeSession', JSON.stringify(endTimeSession));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});