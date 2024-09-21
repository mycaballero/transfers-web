import { defineStore } from 'pinia'
import {useLocalStorage} from '@vueuse/core'

export const useAuthStore = defineStore('users', {
    state: () => ({
        user: useLocalStorage('auth/user',{}),
        tk: useLocalStorage('auth/tk',null)
    }),
    actions: {
        setToken(token) {
            useLocalStorage('auth/tk',token)
            this.tk = token
        },
        setUser(user) {
            useLocalStorage('auth/user',user)
            this.user = user
        },
        logout(){
            this.setUser(null)
            this.setToken(null)
        }
    },
    getters: {
        isAuthenticated(state): Boolean {
            return !!state.tk?.length
        }
    }
});
