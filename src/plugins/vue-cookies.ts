import VueCookies from 'vue3-cookies'
import { app } from "@/main";

export default {
    install: (plugin: any) => {
        app.config.globalProperties.$cookies = plugin

        app.provide('vue-cookies', plugin)
    }
}