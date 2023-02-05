/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '@nuxt/types' {
  interface Context {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): Record<string, string>;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }

  interface NuxtAppOptions {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): Record<string, string>;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }

  interface Configuration {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): Record<string, string>;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): Record<string, string>;
    $isLogged(): boolean;
    $isAdmin(): boolean;
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $api: NuxtAxiosInstance;
    $generateAuthHeader(requestUrl: string, requestMethod: string): Record<string, string>;
  }
}
