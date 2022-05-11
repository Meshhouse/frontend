import { Vue, Component } from 'nuxt-property-decorator'

import type {
  Notification
} from '@/types'

@Component<NotificationContainer>({
})
export default class NotificationContainer extends Vue {
  get notifications (): Notification[] {
    return this.$store.state.notifications
  }

  removeNotification (idx: number) {
    this.$store.commit('removeNotification', idx)
  }
}
