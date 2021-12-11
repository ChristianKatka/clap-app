import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: PostWithoutImage };
  postsLikes: { [id: string]: PostLike | PostLikeDraft };
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

  on(PostsActions.giveLikeToPost, (state, { postLikeDraft }) => {
    const postLikeDraftVariable: { [id: string]: PostLikeDraft } = {
      ...state.postsLikes,
      [postLikeDraft.id]: {
        id: postLikeDraft.id,
        postId: postLikeDraft.postId,
        userId: postLikeDraft.userId,
      },
    };

    return {
      ...state,
      postsLikes: postLikeDraftVariable,
    };
  }),
  on(PostsActions.giveLikeToPostSuccess, (state, { like }) => {
    return {
      ...state,
      postsLikes: {
        ...state.postsLikes,
        [like.id]: {
          ...like,
        },
      },
    };
  }),

  on(PostsActions.removeLikeFromPost, (state, { like }) => {
    const postsLikes = {
      ...state.postsLikes,
    };
    delete postsLikes[like.id];

    return {
      ...state,
      postsLikes,
    };
  }),
  on(PostsActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const postsLikes = {
      ...state.postsLikes,
    };
    delete postsLikes[likeId];

    return {
      ...state,
      postsLikes,
    };
  }),

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

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PostsState | undefined, action: Action) =>
  PostsReducer(state, action);
