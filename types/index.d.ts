/* eslint-disable camelcase */

import type { AxiosRequestConfig } from 'axios'

export type StrapiModelLink = {
  url: string;
  program_version: string;
  renderer_version: string;
  program: string;
  renderer: string;
}

export type StrapiModelTag = {
  [key: string]: string;
  title_en: string;
  title_ru: string;
}

export type StrapiCategory = {
  [key: string]: any;
  id: number;
  title_en: string;
  slug: string;
  icon: string;
  title_ru: string;
  parent_category: StrapiCategory | null;
  description_en: string | null;
  description_ru: string | null;
  created_at: string;
  updated_at: string;
}

export type StrapiSimpleCategory = {
  [key: string]: string;
  slug: string;
  title_en: string;
  title_ru: string;
}

export type StrapiSimpleModel = {
  [key: string]: any;
  id: number;
  title_en: string;
  title_ru: string;
  slug: string;
  is_mature_content: boolean;
  is_copyrighted_content: boolean;
  thumbnail: string | null;
  available_formats: string[];
}

export type StrapiModel = {
  [key: string]: any;
  id: number;
  title_en: string;
  title_ru: string;
  slug: string;
  category: StrapiSimpleCategory;
  description_en: string;
  description_ru: string;
  textures_link: string | null;
  is_mature_content: boolean;
  model_information: {
    polygons: string;
    vertices: string;
    blendshapes: boolean;
    rigged: false;
    hair_system: false;
    textures_type: string;
    hair_system_type: string;
    uv_maps: boolean;
    uv_maps_type: string;
    rig_type: string;
  }
  created_at: string;
  updated_at: string;
  model_links: StrapiModelLink[];
  tags: StrapiModelTag[];
  related_models: StrapiModel[];
  brands: string[];
  thumbnail: string | null;
  images: string[];
  thumbnail_images: string[];
  preview: string | null;
  available_formats: string[];
}

export type StrapiPagination = {
  pages: number;
  count: number;
}

// Application page

export type StrapiApplicationPC = {
  integrations: StrapiIntegration[];
  release: StrapiRelease;
}

export type StrapiRelease = {
  version: string;
  assets: {
    windows: string;
    mac: string;
    linux: string;
  }
}

export type StrapiIntegration = {
  id: number;
  title: string;
  url: string;
  authentication: boolean;
  custom_filters: boolean;
  purchase_models: boolean;
  download_models: boolean;
  custom_installation: boolean;
  logo: string | null;
}

// Index page

export type StrapiFeaturedCategory = {
  [key: string]: any;
  id: number;
  tag: string | null;
  title_en: string;
  title_ru: string;
  category: StrapiSimpleCategory | null;
  thumbnail: string | null;
}

export type StrapiIndexSlide = {
  [key: string]: string | number | null;
  id: number;
  courtesy: string;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  background: string | null;
}

export type StrapiIndexPage = {
  featuredCategories: StrapiFeaturedCategory[];
  slider: StrapiIndexSlide[];
  statistics: {
    max: number;
    maya: number;
    blender: number;
    c4d: number;
    unity: number;
    unreal: number;
  };
  lastUploadedModels: StrapiSimpleModel[];
}

// News page

export type StrapiSimplePost = {
  [key: string]: string | number | null;
  id: number;
  title_en: string;
  title_ru: string;
  slug: string;
  excerpt_en: string;
  excerpt_ru: string;
  created_at: string;
  updated_at: string;
  thumbnail: string | null;
}

export type StrapiPost = StrapiSimplePost & {
  content_en: string;
  content_ru: string;
}


// Axios query params

export type AxiosStrapiModelQuery = AxiosRequestConfig & {
  params: {
    page: number;
    count: number;
    category: string;
    tag?: string;
    format?: string;
  }
}

export type AxiosStrapiSearchQuery = AxiosRequestConfig & {
  params: {
    query: string;
    limit: number;
  }
}

export type AxiosStrapiNewsQuery = AxiosRequestConfig & {
  params: {
    page: number;
    count: number;
  }
}

// Axios response data

export type AxiosStrapiSimpleModelsResponse = {
  items: StrapiSimpleModel[];
  pagination: StrapiPagination;
}

export type AxiosStrapiNewsResponse = {
  items: StrapiSimplePost[];
  pagination: StrapiPagination;
}
