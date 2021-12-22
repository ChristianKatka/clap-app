import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostLikeActions } from '../actions';

export interface PendingPostLikesState {
  pendingPostLikes: { [id: string]: PostLikeDraft };
  pendingRemovePostLikes: { [id: string]: PostLike | PostLikeDraft };
  // USED to check if there is a need to create new id for like (used in posts-like.effect)
  likesThatIhaveAlreadyGiven: { [id: string]: PostLike | PostLikeDraft };
}

export const initialState: PendingPostLikesState = {
  pendingPostLikes: {},
  pendingRemovePostLikes: {},
  likesThatIhaveAlreadyGiven: {},
};

const PendingPostLikesReducer = createReducer(
  initialState,

  on(PostLikeActions.giveLikeToPost, (state, { postLikeDraft }) => {
    const pendingPostLikes: { [id: string]: PostLikeDraft } = {
      ...state.pendingPostLikes,
      [postLikeDraft.id]: {
        id: postLikeDraft.id,
        postId: postLikeDraft.postId,
        userId: postLikeDraft.userId,
      },
    };

    // there shouldnt be pending like and unlike at the same time to the same post
    const pendingRemovePostLikes = deleteFromObjectIndexList(
      state.pendingRemovePostLikes,
      postLikeDraft.id
    );

    return {
      ...state,
      pendingPostLikes,
      pendingRemovePostLikes,
    };
  }),
  on(PostLikeActions.giveLikeToPostSuccess, (state, { like }) => {
    const pendingPostLikes = deleteFromObjectIndexList(
      state.pendingPostLikes,
      like.id
    );

    return {
      ...state,
      pendingPostLikes,
    };
  }),

  on(PostLikeActions.removeLikeFromPost, (state, { like }) => {
    // save that i have previosly liked this post
    const likesThatIhaveAlreadyGiven = {
      ...state.likesThatIhaveAlreadyGiven,
      [like.id]: like,
    };

    const pendingRemovePostLikes = {
      ...state.pendingRemovePostLikes,
      [like.id]: like,
    };

    // there shouldnt be pending like and unlike at the same time to the same post
    const pendingPostLikes = deleteFromObjectIndexList(
      state.pendingPostLikes,
      like.id
    );

    return {
      ...state,
      pendingRemovePostLikes,
      pendingPostLikes,
      likesThatIhaveAlreadyGiven,
    };
  }),
  on(PostLikeActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const likesThatIhaveAlreadyGiven = deleteFromObjectIndexList(
      state.likesThatIhaveAlreadyGiven,
      likeId
    );

    const pendingRemovePostLikes = deleteFromObjectIndexList(
      state.pendingRemovePostLikes,
      likeId
    );

    return {
      ...state,
      pendingRemovePostLikes,
      likesThatIhaveAlreadyGiven,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: PendingPostLikesState | undefined,
  action: Action
) => PendingPostLikesReducer(state, action);
