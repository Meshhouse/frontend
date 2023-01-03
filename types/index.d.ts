import type {
  Category,
  Collection,
  ModelSimple
} from '@meshhouse/types'

/* eslint-disable camelcase */

export type CheckboxMultiSelect = {
  text: string,
  value: string | number | boolean
}

export type PreparedFilter = {
  original: any,
  simplified: any
}

export type Notification = {
  type: string;
  title: string;
  message: string;
  timeout?: number;
}

export type ModelSelectedFilters = {
  [key: string]: any[] | string;
  formats: any[];
  renderers: any[];
  polys: string;
  hair: string;
  rig: string;
  textures: string;
  uv: string;
  mature_content: string;
}

export type CategoryTreeItem = Category & {
  childrens: Category[];
}

export type APIToken = {
  id: number;
  user_id: string;
  name: string;
  type: string;
  created_at: string;
}

export type ApplicationRelease = {
  version: string;
  assets: {
    windows: string;
    mac: string;
    linux: string;
  }
}

export type CollectionWithModels = Collection & {
  items: ModelSimple[]
}
