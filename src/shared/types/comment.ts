export type User = {
  username: string;
  avatar_url?: string | null;
};

export type Comment = {
  id: number;
  post_id: number;
  parent_id?: number | null;
  created_at: string;
  content: string;
  upvotes: number;
  downvotes: number;
  user_vote?: -1 | 0 | 1;
  author?: User | null;
  username?: string;
  avatar_url?: string | null;
  replies?: Comment[];
};
