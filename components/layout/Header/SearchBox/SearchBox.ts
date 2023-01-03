import { Component, mixins } from 'nuxt-property-decorator'
import { mixin as clickaway } from 'vue-clickaway'
import type {
  ModelSimple
} from '@meshhouse/types'
import ModelCard from '@/components/ModelCard/ModelCard.vue'

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
      const nonRedirectedRoutes = [
        'models___',
        'models-category___'
      ]

      if (!nonRedirectedRoutes.some(v => this.$route.name?.startsWith(v))) {
        this.$router.push(this.localePath(`/models/?q=${this.search}`))
        this.onInputBlur()
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

  async fetchSearchResults (): Promise<void> {
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
