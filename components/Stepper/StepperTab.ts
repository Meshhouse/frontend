import { Vue, Component } from 'nuxt-property-decorator'

@Component<StepperTab>({})

export default class StepperTab extends Vue {
  active = false
}
