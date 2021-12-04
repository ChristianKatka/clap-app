import { InitActions } from '@app/store/actions';
import { createReducer, on, Action } from '@ngrx/store';
import { PostLike } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: PostWithoutImage };
  likes: { [postId: string]: PostLike };
  sortBy: 'latest';
  loading: boolean;
}

export const initialState: PostsState = {
  entities: {},
  likes: {},
  sortBy: 'latest',
  loading: false,
};

const PostsReducer = createReducer(
  initialState,
  on(PostsActions.createPostWithoutImage, (state) => ({
    ...state,
    loading: true,
  })),

  on(PostsActions.createPostWithoutImageSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    entities: {
      ...state.entities,
      [post.id]: {
        ...post,
      },
    },
  })),

  on(PostsActions.giveLikeToPost, (state, { postId }) => {
    const entities = { ...state.entities };
    entities[postId] = { ...entities[postId], iLikeThisPost: true };
    return {
      ...state,
      entities,
      loading: true,
    };
  }),
  on(PostsActions.giveLikeToPostSuccess, (state, { postId, like }) => {
    const entities = { ...state.entities };
    entities[postId].likes.push(like);
    return {
      ...state,
      entities,
      loading: false,
    };
  }),

  on(PostsActions.removeLikeFromPost, (state, { postId }) => {
    const entities = { ...state.entities };
    entities[postId] = { ...entities[postId], iLikeThisPost: false };
    return {
      ...state,
      entities,
      loading: true,
    };
  }),
  on(PostsActions.removeLikeFromPostSuccess, (state) => {
    const entities = { ...state.entities };

    return {
      ...state,
      loading: false,
    };
  }),

  on(InitActions.loadApplicationInitializeDataSuccess, (state, { posts }) => {
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
