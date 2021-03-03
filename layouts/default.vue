<template>
  <div class="app">
    <app-header />
    <main class="main">
      <nuxt />
    </main>
    <app-footer />
  </div>
</template>



<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AppFooter from '@/components/AppFooter/AppFooter.vue'

@Component({
  components: {
    AppHeader,
    AppFooter
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
}
</script>

<style lang="sass">
@import 'sass/main'
</style>
