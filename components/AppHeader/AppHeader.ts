import { Vue, Component } from 'nuxt-property-decorator'
import HeaderCategories from '@/components/Header/HeaderCategories/HeaderCategories.vue'
import LanguageSelector from '@/components/Header/LanguageSelector/LanguageSelector.vue'
import ThemeSelector from '@/components/Header/ThemeSelector/ThemeSelector.vue'
import SearchBox from '@/components/Header/SearchBox/SearchBox.vue'

@Component({
  components: {
    HeaderCategories,
    LanguageSelector,
    ThemeSelector,
    SearchBox
  }
})

export default class AppHeader extends Vue {
  toggled = false

  toggle () {
    this.toggled = !this.toggled
  }
}
