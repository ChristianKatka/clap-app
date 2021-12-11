import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';

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
    const postsLikes: { [id: string]: PostLikeDraft } = {
      ...state.postsLikes,
      [postLikeDraft.id]: {
        id: postLikeDraft.id,
        postId: postLikeDraft.postId,
        userId: postLikeDraft.userId,
      },
    };

    return {
      ...state,
      postsLikes,
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
    const postsLikes = deleteFromObjectIndexList(state.postsLikes, like.id);

    return {
      ...state,
      postsLikes,
    };
  }),
  on(PostsActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const postsLikes = deleteFromObjectIndexList(state.postsLikes, likeId);

    return {
      ...state,
      postsLikes,
    };
  }),

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { posts, postsLikes }) => {
      const entities = createObjectIndexList(posts);
      const myPostsLikes = createObjectIndexList(postsLikes);

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
