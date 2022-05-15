import { Component, mixins } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

import type {
  ModelSimple
} from '@/types/api/models'

@Component<SearchBox>({
  components: {
    ModelCard
  }
})

export default class SearchBox extends mixins(clickaway) {
  search = ''
  isResultsVisible = false
  results: ModelSimple[] = []

  created () {
    if (this.$route.query.q) {
      this.search = String(this.$route.query.q)
    }
  }

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
      if (!this.$route.name?.includes('models-category')) {
        this.$router.push(this.localePath(`/models/?q=${this.search}`))
      } else {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            q: this.search
          }
        })
      }
    }
  }

  async fetchSearchResults (): Promise<any> {
    const response = await this.$api({
      method: 'GET',
      url: 'autocomplete',
      params: {
        query: this.search
      },
      headers: {
        ...this.$generateAuthHeader('autocomplete', 'GET'),
        'x-meshhouse-mature-content': true
      }
    })

    this.results = response.data.models
    this.changeVisibility(true)
  }
}
