import { Vue, Component } from 'nuxt-property-decorator'
import UserBoxContent from '@/components/layout/Header/UserBox/UserBoxContent.vue'
@Component<UserBox>({
  components: {
    UserBoxContent
  }
})

export default class UserBox extends Vue {
}
