/* eslint-disable camelcase */
export type LicenseAccess = 'free' | 'subscriber' | 'subscriber-continious'

export type License = {
  [key: string]: number | string | boolean;
  id: number;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  access: LicenseAccess;
  mature_content: boolean;
  copyright_content: boolean;
  created_at: string;
  updated_at: string;
}
