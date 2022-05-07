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
