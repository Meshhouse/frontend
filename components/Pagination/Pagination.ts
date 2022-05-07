import { Vue, Component, Prop } from 'nuxt-property-decorator'
import type {
  Pagination
} from '@/types/api'

@Component({})

export default class Paginator extends Vue {
  @Prop({ type: Object, required: true }) readonly pagination!: Pagination
  @Prop({ type: String, required: true, default: 'models' }) readonly baseUrl!: string
  @Prop({ type: String, required: true, default: '' }) readonly param!: string

  paginatorLimit = 5

  get activePage (): number {
    return this.$route.query.page !== undefined ? Number(this.$route.query.page) : 1
  }

  get paginatorPages (): number[] {
    const arr: number[] = []
    for (let i = 1; i <= this.pagination.last_page; i++) {
      arr.push(i)
    }
    const pages = Number(this.activePage) + this.paginatorLimit
    const slicedArr = arr.slice(this.activePage - 1, pages)
    if (this.pagination.last_page < this.paginatorLimit) {
      return arr
    }
    if (slicedArr.length <= this.paginatorLimit) {
      return arr.slice(this.activePage - pages - 1, pages)
    }
    return arr.slice(this.activePage - 1, pages)
  }

  generateLink (index: number): any {
    if (index === 1 || index === 0) {
      return {
        path: this.localePath(`/${this.baseUrl}${this.param !== '' ? '/' + this.param : this.param}`)
      }
    }
    return {
      path: this.localePath(`/${this.baseUrl}${this.param !== '' ? '/' + this.param : this.param}`),
      query: {
        page: index
      }
    }
  }
}
