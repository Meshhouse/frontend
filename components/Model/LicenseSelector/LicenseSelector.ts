import { Vue, Component, Prop } from 'nuxt-property-decorator'
import RadioButton from '@/components/RadioButton/RadioButton.vue'

@Component({
  components: {
    RadioButton
  },
  model: {
    prop: 'checked',
    event: 'change'
  }
})

export default class LicenseSelector extends Vue {
  @Prop({ required: true, default: '' }) readonly checked!: string | number
  @Prop({ required: false, default: '' }) readonly value!: string | number
  @Prop({ required: true, default: () => [] }) readonly licenses!: any[]

  get isCheckedValue () : boolean {
    return this.checked === this.value
  }

  getLicenseClass (val: string | boolean, passedRequirements: boolean): string {
    let baseClass = 'license__requirements'

    if (val === 'none' || val === false) {
      baseClass += ' license__requirements--success'
    } else if (passedRequirements) {
      baseClass += ' license__requirements--success'
    } else {
      baseClass += ' license__requirements--warning'
    }

    return baseClass
  }

  getAttributionText (label: string): string {
    switch (label) {
      case 'lazy':
        return this.$t('license.features.attribution.lazy').toString()
      case 'eager':
        return this.$t('license.features.attribution.eager').toString()
      default:
        return this.$t('license.features.attribution.none').toString()
    }
  }

  getRequrementsText (label: string | boolean): string {
    switch (label) {
      case 'patreon-otd':
        return this.$t('license.requirements.patreon-otd').toString()
      case 'patreon-recurrent':
        return this.$t('license.requirements.patreon-recurrent').toString()
      default:
        return this.$t('license.requirements.none').toString()
    }
  }
}
