/* eslint-disable camelcase */
import type {
  Category
} from '@/types/api/categories'

import type {
  Collection
} from '@/types/api/collections'

export type ModelFormat = '3ds_max' | 'maya' | 'blender' | 'cinema4d' | 'unity' | 'unreal_engine'
export type ModelRenderer = 'v-ray' | 'mental_ray' | 'arnold' | 'redshift' | 'cycles' | 'corona' | 'unity'
| 'unreal_engine'
export type ModelHairSystem = 'standard' | 'ornatrix' | 'xgen' | 'hairfarm' | 'yeti'
export type ModelTextures = 'procedural' | 'pbr' | 'npr'
export type ModelTexturesWrapping = 'generated' | 'unwrap_uvw' | 'udim' | 'uvtile'
export type ModelRigging = 'bones' | 'autodesk_cat'
export type ModelGeometry = 'tris' | 'quads' | 'ngons' | 'combined'

export type ModelImage = {
  original: string;
  slide: string;
  thumbnail: string;
}

export type ModelFile = {
  id?: number;
  url: string;
  program: ModelFormat;
  program_version: string;
  renderer: ModelRenderer;
  renderer_version: string;
}

export type ModelSimple = {
  [key: string]: string | number | boolean;
  id: number;
  slug: string;
  mature_content: boolean;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_ru: string;
}

export type ModelFull = {
  [key: string]: any;
  id: number;
  slug: string;
  mature_content: boolean;
  brands: string[];
  install_paths: {
    models: string;
    textures: string;
  };
  textures_link: string;
  thumbnail: string;
  images: ModelImage[];
  preview: string | null;
  created_at: string;
  updated_at: string;
  files: ModelFile[];
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  tags_en: string[];
  tags_ru: string[];
  polygons: number;
  vertices: number;
  category: Category;
  blendshapes: boolean;
  licenses: number[];
  collections: Collection[];
  rig: ModelRigging | boolean;
  hair_system: ModelHairSystem | boolean;
  textures: ModelTextures | boolean;
  uv: ModelTexturesWrapping | boolean;
}
