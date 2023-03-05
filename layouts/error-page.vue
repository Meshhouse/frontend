<template>
  <div class="app" :class="isMaintenanceMode ? 'app--error' : ''">
    <app-header v-if="!isMaintenanceMode" />
    <main class="main main--full-height">
      <nuxt />
    </main>
    <app-footer :simple="isMaintenanceMode" />
    <portal-target name="overlay" />
    <client-only>
      <notification-container />
    </client-only>
  </div>
</template>



<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { isLoggedIn } from 'axios-jwt'
import AppHeader from '@/components/layout/Header/AppHeader.vue'
import AppFooter from '@/components/layout/Footer/AppFooter.vue'
import FooterTopSupporters from '@/components/layout/Footer/FooterTopSupporters/FooterTopSupporters.vue'
import FooterPatrons from '@/components/layout/Footer/FooterPatrons/FooterPatrons.vue'
import NotificationContainer from '@/components/Notification/NotificationContainer.vue'

@Component<ErrorPage>({
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

export default class ErrorPage extends Vue {
  get isMaintenanceMode (): boolean {
    return (this.$nuxt as any).nuxt.err && (this.$nuxt as any).nuxt.err.statusCode === 503
  }

  async created (): Promise<void> {
    if (process.client) {
      this.$store.dispatch('generateUniqueId')
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
}
</script>
