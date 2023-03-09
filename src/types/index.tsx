export interface PostsState {
   postsData: arrPostsState[] | undefined;
   loading: boolean;
}

export interface OnePostState {
   onePostData: {
      title: string;
      score: number;
      descendants: number;
      by: string;
      time: number;
      url: string;
      kids: number[] | undefined
   } | undefined;
   loading: boolean;
   comments: number[] | [] | undefined;
   childComments: {
      id: number;
      childComments: [];
   };
}

export interface arrPostsState {
   id: number | null;
   data: {
      title: string;
      score: number;
      by: string;
      time: number;
      kids: number[]
   } | null
}

export interface GetPostsIdState {
   options: {};
}

export interface GetPostsState {
   id: number | string | undefined
   options: {};
}

export interface GetCommentsState {
   kids: number[];
   options: {};
}

export interface CommentState {
   id: number;
   by: string;
   text: string;
   time: number;
   kids: number[]
}

