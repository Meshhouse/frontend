/* eslint-disable camelcase */
export type Category = {
  [key: string]: string | number | null;
  id: number;
  slug: string;
  icon: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
}

export type CategoryTreeItem = Category & {
  childrens: Category[];
}

export type CategoryFilter = {
  [key: string]: any;
  id: number;
  category: number | null;
  order: number;
  key: string;
  type: 'radio' | 'checkbox' | 'checkbox-color' | 'range'
  querystring_alias: string;
  value_delimeter: string | null;
  values: any[];
  title_en: string;
  title_ru: string;
}
