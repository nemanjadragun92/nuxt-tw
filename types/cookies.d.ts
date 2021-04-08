import { NuxtCookies } from 'cookie-universal-nuxt'

declare module '@nuxt/types' {
  interface Context {
    $cookies: NuxtCookies
  }

  interface NuxtAppOptions {
    $cookies: NuxtCookies
  }

  interface Configuration {
    $cookies: NuxtCookies
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: NuxtCookies
  }
}
