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
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'
import FooterTopSupporters from '@/components/Footer/FooterTopSupporters.vue'
import FooterPatrons from '@/components/Footer/FooterPatrons.vue'
import NotificationContainer from '@/components/Notification/NotificationContainer.vue'

import type {
  SiteSupporter,
  SitePatron
} from '@/types/api/blocks'

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
        class: `theme-${this.$store.state.theme} ${this.$store.state.modalVisible ? 'no-scroll' : ''}`
      }
    }
  }
})

export default class DefaultLayout extends Vue {
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
}
</script>
