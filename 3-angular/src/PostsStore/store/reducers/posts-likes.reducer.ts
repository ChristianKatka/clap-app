import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostLikeActions } from '../actions';

export interface PostsLikesState {
  postsLikes: { [id: string]: PostLike | PostLikeDraft };
}

export const initialState: PostsLikesState = {
  postsLikes: {},
};

const PostsLikesReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postsLikes }) => {
      const myPostsLikes = createObjectIndexList(postsLikes);

      return {
        ...state,
        postsLikes: myPostsLikes,
      };
    }
  ),

  on(PostLikeActions.giveLikeToPost, (state, { postLikeDraft }) => {
    const postsLikes: { [id: string]: PostLikeDraft } = {
      ...state.postsLikes,
      [postLikeDraft.id]: postLikeDraft,
    };

    return {
      ...state,
      postsLikes,
    };
  }),
  on(PostLikeActions.giveLikeToPostSuccess, (state, { like }) => {
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
  on(PostLikeActions.newLikeHappenedViaSocket, (state, { like }) => {
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
  on(PostLikeActions.removeLikeFromPost, (state, { like }) => {
    const postsLikes = deleteFromObjectIndexList(state.postsLikes, like.id);

    return {
      ...state,
      postsLikes,
    };
  }),
  on(PostLikeActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const postsLikes = deleteFromObjectIndexList(state.postsLikes, likeId);

    return {
      ...state,
      postsLikes,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: PostsLikesState | undefined, action: Action) =>
  PostsLikesReducer(state, action);
