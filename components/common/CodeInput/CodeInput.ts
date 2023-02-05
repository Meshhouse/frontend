import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component<CodeInput>({})
export default class CodeInput extends Vue {
  @Prop({
    type: String,
    required: true,
    default: ''
  }) readonly value!: string

  @Prop({
    type: Number,
    required: false,
    default: 4
  }) readonly length!: number

  cells: string[] = []

  get codeComputed (): string {
    return this.cells.reduce((pin, cell) => pin + cell, '')
  }

  mounted () {
    this.reset()
  }

  onInput (event: KeyboardEvent, idx: number) {
    if ((event.target as HTMLInputElement).value && this.cells[idx].length === 1) {
      (event.target as HTMLInputElement).value = this.cells[idx]
      event.preventDefault()
    } else {
      this.$set(this.cells, idx, (event.target as HTMLInputElement).value)
    }

    this.$emit('input', this.codeComputed)
    if (this.codeComputed.length !== this.length) {
      if (this.cells[idx] !== '' && idx < this.length - 1) {
        this.$refs[`input-${idx + 1}`][0].focus()
      } else if (this.cells[idx] === '' && idx > 0) {
        this.$refs[`input-${idx - 1}`][0].focus()
      }
    } else {
      this.$emit('submit', this.codeComputed)
    }
  }

  reset () {
    this.$refs['input-0'][0].focus()
    this.cells = Array(this.length).fill('')
  }
}
