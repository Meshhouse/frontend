import { Vue, Component } from 'nuxt-property-decorator'
import DropdownButton from '@/components/Button/DropdownButton.vue'

@Component({
  components: {
    DropdownButton
  }
})

export default class LanguageSelector extends Vue {
}