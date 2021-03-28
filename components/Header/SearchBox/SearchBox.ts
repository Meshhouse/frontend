import { Component, mixins } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

@Component<SearchBox>({
  components: {
    ModelCard
  }
})

export default class SearchBox extends mixins(clickaway) {
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
      this.$router.push(this.localePath(`/search?q=${this.search}`))
    }
  }

  async fetchSearchResults (): Promise<any> {
    const response = await (this as any).$strapi({
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
