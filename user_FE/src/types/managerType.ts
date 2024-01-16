export interface IDashCount {
  count: number;
  title: string;
  icon: any;
  backgroundColor: string;
}
export interface IPost {
  title: string;
  content: string;
  summary: string;
  thumbnail: string;
  id?: string;
  category_id?: number;
  view?: number;
}

export interface IAbout {
  content: string;
  facebook: string;
  instal: string;
  linkedin: string;
  title: string;
  youtube: string;
}
export interface IProfile {
  id?: number;
  username: string;
  email: string;
  address: string;
}
