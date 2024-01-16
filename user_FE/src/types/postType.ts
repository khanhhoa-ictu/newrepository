export interface IComment {
  content: string;
  username: string;
  id: number;
  post_id: number;
  reg_date: string;
  user_id: number;
  avatar?: string;
  reply: IReply[];
}

export interface IReply {
  comment_id: number;
  content: string;
  id: number;
  reg_date: string;
  username: string;
  avatar: string;
}

export interface ICategory {
  category: number;
  page: number;
}

export interface IAddComment {
  user_id: number;
  post_id: string;
  content: string;
}

export interface IAddReply {
  content: string;
  comment_id: number;
  user_id: number;
}
