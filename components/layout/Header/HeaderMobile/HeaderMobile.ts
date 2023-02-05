import { Vue, Component } from 'nuxt-property-decorator'
import UserBoxContent from '@/components/layout/Header/UserBox/UserBoxContent.vue'
import LanguageSelector from '@/components/layout/Header/LanguageSelector/LanguageSelector.vue'
import SearchBox from '@/components/layout/Header/SearchBox/SearchBox.vue'
import ModalBasic from '@/components/Modals/ModalBasic/ModalBasic.vue'

@Component<HeaderMobile>({
  components: {
    LanguageSelector,
    SearchBox,
    UserBoxContent,
    ModalBasic
  }
})
export default class HeaderMobile extends Vue {
}
