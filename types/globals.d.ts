import type { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '@nuxt/types' {
  interface Context {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): any;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }

  interface NuxtAppOptions {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): any;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }

  interface Configuration {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): any;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): any;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }
}
