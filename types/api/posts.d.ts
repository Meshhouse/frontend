/* eslint-disable camelcase */
export type BlogSimple = {
  [key: string]: string | number | null;
  id: number;
  slug: string;
  title_en: string,
  title_ru: string;
  thumbnail: string | null;
  excerpt_en: string;
  excerpt_ru: string;
  created_at: string;
  updated_at: string;
}

export type BlogFull = {
  [key: string]: string | number | null | undefined;
  id: number;
  slug: string;
  title_en?: string;
  title_ru?: string;
  title?: string;
  thumbnail: string | null;
  excerpt_en?: string;
  excerpt_ru?: string;
  excerpt?: string;
  content_en?: string;
  content_ru?: string;
  content?: string;
  created_at: string;
  updated_at: string;
}
