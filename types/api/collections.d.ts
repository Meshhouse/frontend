import { ModelSimple } from '@/types/api/models'

/* eslint-disable camelcase */
export type Collection = {
  [key: string]: number | string | undefined;
  id: number;
  slug: string;
  title_en?: string;
  title_ru?: string;
  title?: string;
}

export type CollectionWithModels = Collection & {
  items: ModelSimple[]
}
