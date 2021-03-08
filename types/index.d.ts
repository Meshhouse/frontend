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
  brands: string[];
  thumbnail: string | null;
  images: string[];
  preview: string | null;
}
