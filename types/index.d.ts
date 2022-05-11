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
