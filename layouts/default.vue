<template>
  <div class="app">
    <app-header />
    <main
      class="main"
      :class="mainClass"
    >
      <nuxt />
    </main>
    <footer-patrons
      v-if="footerPatrons.length > 0"
      :patrons="footerPatrons"
    />
    <footer-top-supporters
      v-if="footerTopSupporters.length > 0"
      :supporters="footerTopSupporters"
    />
    <app-footer :class="footerClass" />
    <portal-target name="overlay" />
    <client-only>
      <notification-container />
    </client-only>
  </div>
</template>



<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { isLoggedIn } from 'axios-jwt'
import type {
  SiteSupporter,
  SitePatron
} from '@meshhouse/types'
import AppHeader from '@/components/layout/Header/AppHeader.vue'
import AppFooter from '@/components/layout/Footer/AppFooter.vue'
import FooterTopSupporters from '@/components/layout/Footer/FooterTopSupporters/FooterTopSupporters.vue'
import FooterPatrons from '@/components/layout/Footer/FooterPatrons/FooterPatrons.vue'
import NotificationContainer from '@/components/Notification/NotificationContainer.vue'

@Component<DefaultLayout>({
  components: {
    AppHeader,
    AppFooter,
    FooterPatrons,
    FooterTopSupporters,
    NotificationContainer
  },
  head () {
    return {
      bodyAttrs: {
        class: `${this.$store.state.modalVisible ? 'no-scroll' : ''}`
      }
    }
  }
})

export default class DefaultLayout extends Vue {
  async created (): Promise<void> {
    if (process.client) {
      this.$store.dispatch('generateUniqueId')

      if (this.$route?.query?.signature) {
        try {
          const response = await this.$api({
            method: 'POST',
            url: 'verify-email',
            data: {
              signature: this.$route.query.signature
            },
            headers: this.$generateAuthHeader('verify-email', 'POST')
          })

          if (response.status === 200) {
            this.$store.dispatch('addNotification', {
              type: 'primary',
              title: this.$t('notifications.email_verification.title'),
              message: this.$t('notifications.email_verification.text'),
              timeout: 5000
            })
          }
        } catch (err) {
          this.$sentry.captureException(err)
          console.error(err)
        }
      }
    }

    if (process.client && isLoggedIn()) {
      try {
        const profile = (await this.$api({
          method: 'GET',
          url: 'profile',
          headers: this.$generateAuthHeader('profile', 'GET')
        })).data

        this.$store.commit('setUser', profile)
      } catch (err) {
        this.$sentry.captureException(err)
        console.error(err)
      }
    }
  }

  mounted (): void {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + 'px')
  }

  get footerClass (): any[] {
    return [
      { 'footer--models': this.$route.name?.startsWith('models___') }
    ]
  }

  get mainClass (): any[] {
    return [
      { 'main--full-height': this.$route.name?.startsWith('models___') || this.$route.name?.startsWith('api-docs___') }
    ]
  }

  get footerPatrons (): SitePatron[] {
    return this.$store.state.supporters
  }

  get footerTopSupporters (): SiteSupporter[] {
    return this.$store.state.topSupporters
  }

  errorCaptured (this: DefaultLayout, err: Error, vm: Vue, info: string) {
    this.$sentry.captureException(err)
    console.error('error handled in layout', err, vm, info)
    return false
  }
}
</script>
