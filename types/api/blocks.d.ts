/* eslint-disable camelcase */
export type Integration = {
  logo: string;
  params: {
    auth: boolean;
    custom_install: boolean;
    download: boolean;
    filters: boolean;
    purchase: boolean;
  };
  title: string;
  url: string;
}

export type IntegrationDynamicBlock = {
  id: number;
  type: string;
  content: Integration[];
  created_at: string;
  updated_at: string;
}

export type Courtesy = {
  [key: string]: string;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  background: string;
  courtesy: string;
}

export type CourtesyDynamicBlock = {
  id: number;
  type: string;
  content: Courtesy[];
  created_at: string;
  updated_at: string;
}

export type FeaturedCategory = {
  [key: string]: string;
  title_en: string;
  title_ru: string;
  thumbnail: string;
  tag: string;
  category_slug: string;
}

export type FeaturedCategoriesDynamicBlock = {
  id: number;
  type: string;
  content: FeaturedCategory[];
  created_at: string;
  updated_at: string;
}

export type SitePatron = {
  title: string;
  level: string;
}

export type SiteSupporter = {
  title: string;
  logo: string;
  url: string;
}
