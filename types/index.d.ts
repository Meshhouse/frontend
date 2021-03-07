/* eslint-disable camelcase */

export type StrapiModelLink = {
  url: string;
  program_version: string;
  renderer_version: string;
  program: string;
  renderer: string;
}

export type StrapiModelTag = {
  title_en: string;
  title_ru: string;
}

export type StrapiModel = {
  id: number;
  title_en: string;
  title_ru: string;
  slug: string;
  category: {
    slug: string;
    title_en: string;
    title_ru: string;
  }
  description_en: string;
  description_ru: string;
  textures_link: string | null;
  is_mature_content: boolean;
  information: {
    hairFur: string;
    morpher: boolean;
    polys: number;
    skinning: string;
    textures: string;
    verts: number;
  }
  created_at: string;
  updated_at: string;
  model_links: StrapiModelLink[];
  tags: StrapiModelTag[];
  brands: string[];
  thumbnail: string | null;
  images: string[];
  preview: string | null;
}
