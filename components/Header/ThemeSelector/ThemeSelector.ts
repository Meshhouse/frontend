import { Vue, Component } from 'nuxt-property-decorator'
import VueSwitch from '@/components/Switch/Switch.vue'

@Component({
  components: {
    VueSwitch
  }
})

export default class ThemeSelector extends Vue {
  handleSwitcher (): void {
    const theme = this.$store.state.theme
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    this.$store.commit('setTheme', newTheme)
    this.$cookies.set('theme', newTheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax'
    })
  }
}
