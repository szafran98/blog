export interface PostResponse {
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
  content: string;
  author: Author;
  tags: string[];
  date_pub_timestamp: number;
  post_comments: Comment[];
  likes_count: number;
  is_liked_by_user: boolean;
}

export interface Comment {
  id: number;
  url: string;
  content: string;
  author: Author;
  date_pub_timestamp: number;
  to_post: string;
  likes_count: number;
  is_liked_by_user: boolean;
}

export interface Author {
  id: number;
  url: string;
  username: string;
  email: string;
}
