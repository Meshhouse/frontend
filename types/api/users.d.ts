/* eslint-disable camelcase */
export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  remember_me_token: any;
  created_at: string;
  updated_at: string;
}

export type APIToken = {
  id: number;
  user_id: string;
  name: string;
  type: string;
  created_at: string;
}
