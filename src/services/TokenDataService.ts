import { AxiosRequestConfig } from 'axios'
import axios from '@/utils/http-common'
import { app } from "@/main";
import Cookies from 'js-cookie'

class TokenDataService {
    private TOKEN_KEY = 'token'

    setToken (tokenData: any) {
        //VueCookies.set(this.TOKEN_KEY, tokenData)
        //VueCookies.VueCookies.set()
        Cookies.set(this.TOKEN_KEY, tokenData)
    }

    removeToken () {
        Cookies.remove(this.TOKEN_KEY)
    }

    getAccessToken () {
        try {
            return Cookies.getJSON(this.TOKEN_KEY).access
            //return window.$nuxt.$cookies.get(this.TOKEN_KEY).access
        } catch (e) {
            return null
        }
    }

    getRefreshToken () {
        return Cookies.getJSON(this.TOKEN_KEY).refresh
        //return window.$nuxt.$cookies.get(this.TOKEN_KEY).refresh
    }

    verifyToken () {
        const accessToken = this.getAccessToken()
        if (typeof accessToken === 'undefined') {
            console.log('undefined kurwa')
            this.removeToken()
            return false
        } else if (accessToken === null) {
            console.log('null kurwa')
            return false
        } else {
            axios.post('http://127.0.0.1:8000/auth/jwt/verify/', {
                token: this.getAccessToken()
            })
                .then((res) => {
                    console.log('edsadsa')
                    return true
                })
                .catch((err) => {
                    console.log('catch')
                    console.log(err.response)
                    this.removeToken()
                    return false
                })
        }
    }

    refreshTokenApiRequest () {
        if (this.verifyToken()) {
            axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', {
                refresh: this.getRefreshToken()
            })
                .then((res) => {
                    Cookies.set(this.TOKEN_KEY, {
                        access: res.data.access,
                        refresh: this.getRefreshToken()
                    })
                    // this.$store.commit('changeTokenRefreshTriedState')
                })
        }
    }

    getTokenHeaders() {
        return {
            headers: {
                Authorization: `JWT ${this.getAccessToken()}`
            }
        }
    }
}

export default new TokenDataService()
