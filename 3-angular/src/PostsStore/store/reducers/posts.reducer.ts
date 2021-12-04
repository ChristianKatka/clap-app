import { InitActions } from '@app/store/actions';
import { createReducer, on, Action } from '@ngrx/store';
import { PostLike } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: PostWithoutImage };
  postsLikes: { [id: string]: PostLike };
  sortBy: 'latest';
  loading: boolean;
}

export const initialState: PostsState = {
  entities: {},
  postsLikes: {},
  sortBy: 'latest',
  loading: false,
};

const PostsReducer = createReducer(
  initialState,
  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { posts, postsLikes }) => {
      const entities = posts.reduce(
        (posts: { [id: string]: any }, post: any) => ({
          ...posts,
          [post.id]: post,
        }),
        {}
      );

      const myPostsLikes = postsLikes.reduce(
        (likes: { [id: string]: any }, like: any) => ({
          ...likes,
          [like.id]: like,
        }),
        {}
      );

      return {
        ...state,
        postsLikes: myPostsLikes,
        entities,
      };
    }
  ),

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

  on(PostsActions.giveLikeToPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.giveLikeToPostSuccess, (state, { like }) => ({
    ...state,
    loading: false,
    postsLikes: {
      ...state.postsLikes,
      [like.id]: {
        ...like,
      },
    },
  })),

  on(PostsActions.removeLikeFromPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const postsLikes = {
      ...state.postsLikes,
    };
    delete postsLikes[likeId];

    return {
      ...state,
      loading: false,
      postsLikes,
    };
  }),

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PostsState | undefined, action: Action) =>
  PostsReducer(state, action);
