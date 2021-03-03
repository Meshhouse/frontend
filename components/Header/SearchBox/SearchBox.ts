import { Vue, Component } from 'nuxt-property-decorator'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component({
  components: {
    ModelCard
  }
})

export default class SearchBox extends Vue {
  search = ''
  isResultsVisible = false
  results: any[] = []

  changeVisibility (value: boolean) {
    if (this.search.length > 0 && this.results.length > 0) {
      this.isResultsVisible = value
    } else {
      this.isResultsVisible = false
    }
  }

  onInputSubmit (search: string) {
    this.search = search.trim()
    if (this.search.length > 0) {
      this.fetchSearchResults()
    } else {
      this.isResultsVisible = false
    }
  }

  onInputFocus () {
    this.changeVisibility(true)
  }

  onInputBlur () {
    this.isResultsVisible = false
  }

  onKeypress (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.$router.push(this.localePath(`/models/all?search=${this.search}`))
    }
  }

  async fetchSearchResults (): Promise<any> {
    const response = await (this as any).$strapiBrowser({
      method: 'GET',
      url: '/models/search',
      params: {
        query: this.search
      }
    })

    this.results = response.data
    this.changeVisibility(true)
  }
}
