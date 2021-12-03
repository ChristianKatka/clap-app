import { createReducer, on, Action } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: any };
  loading: boolean;
}

export const initialState: PostsState = {
  entities: {},
  loading: false,
};

const PostsReducer = createReducer(
  initialState,
  on(PostsActions.createPost, (state) => ({ ...state, loading: true })),

  on(PostsActions.createPostSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    entities: {
      ...state.entities,
      [post.id]: {
        ...post,
      },
    },
  })),

  on(PostsActions.getAllPostsSuccess, (state, { posts }) => {
    const entities = posts.reduce(
      (posts: { [id: string]: any }, post: any) => ({
        ...posts,
        [post.id]: post,
      }),
      {}
    );
    return {
      ...state,
      entities,
    };
  }),

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PostsState | undefined, action: Action) =>
  PostsReducer(state, action);
