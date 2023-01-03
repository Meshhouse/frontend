import { Vue, Component } from 'nuxt-property-decorator'
import type {
  License
} from '@meshhouse/types'
import Stepper from '@/components/Stepper/Stepper.vue'
import StepperTab from '@/components/Stepper/StepperTab.vue'
import Checkbox from '@/components/common/Checkbox/Checkbox.vue'
import RadioButton from '@/components/common/RadioButton/RadioButton.vue'

@Component<LicensingQuiz>({
  components: {
    Stepper,
    StepperTab,
    Checkbox,
    RadioButton
  }
})

export default class LicensingQuiz extends Vue {
  currentStep = 0
  steps = ['Use cases', 'Mature content', 'Copyright', 'Authorship', 'Review']

  useCases: string[] = []
  matureContent = 'false'
  copyright = 'false'
  authorship = 'true'
  availableLicenses: License[] = this.$store.state.licenses

  get calculatedLicense () {
    let filteredLicenses = this.availableLicenses

    if (this.matureContent === 'true') {
      filteredLicenses = filteredLicenses.filter(license => license.mature_content === true)
    }

    if (this.copyright === 'true') {
      filteredLicenses = filteredLicenses.filter(license => license.copyright_content === true)
    }

    if (this.authorship === 'false') {
      filteredLicenses = filteredLicenses.filter(license => license.access !== 'free')
    }

    return filteredLicenses[0]
  }
}
