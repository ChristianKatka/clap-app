import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PendingState {
  pendingPostLikes: { [id: string]: PostLikeDraft };
  pendingRemovePostLikes: { [id: string]: PostLike | PostLikeDraft };
  likesThatIhaveAlreadyGiven: { [id: string]: PostLike | PostLikeDraft };
}

export const initialState: PendingState = {
  pendingPostLikes: {},
  pendingRemovePostLikes: {},
  likesThatIhaveAlreadyGiven: {},
};

const PendingReducer = createReducer(
  initialState,

  on(PostsActions.giveLikeToPost, (state, { postLikeDraft }) => {
    const likesThatIhaveAlreadyGiven = {
      ...state.likesThatIhaveAlreadyGiven,
    };

    const pendingPostLikes: { [id: string]: PostLikeDraft } = {
      ...state.pendingPostLikes,
      [postLikeDraft.id]: {
        id: postLikeDraft.id,
        postId: postLikeDraft.postId,
        userId: postLikeDraft.userId,
      },
    };

    // example: i accidentally removed like from post i didnt mean to, and give like back fast enough no api call is made
    if (likesThatIhaveAlreadyGiven[postLikeDraft.id]) {
      delete pendingPostLikes[postLikeDraft.id];
    }
    return {
      ...state,
      pendingPostLikes,
    };
  }),
  on(PostsActions.giveLikeToPostSuccess, (state, { like }) => {
    const pendingPostLikes = {
      ...state.pendingPostLikes,
    };
    delete pendingPostLikes[like.id];
    return {
      ...state,
      pendingPostLikes,
    };
  }),

  on(PostsActions.removeLikeFromPost, (state, { like }) => {
    const likesThatIhaveAlreadyGiven = {
      ...state.likesThatIhaveAlreadyGiven,
      [like.id]: like,
    };

    const pendingRemovePostLikes = {
      ...state.pendingRemovePostLikes,
      [like.id]: like,
    };

    // Delete pending post like if already found on pending post like
    const pendingPostLikes = {
      ...state.pendingPostLikes,
    };
    delete pendingPostLikes[like.id];

    // example: i give accidentally like to post i didnt mean to, and i remove that like fast enough no api call is made
    if (likesThatIhaveAlreadyGiven[like.id]) {
      delete pendingRemovePostLikes[like.id];
    }

    return {
      ...state,
      pendingRemovePostLikes,
      likesThatIhaveAlreadyGiven,
      pendingPostLikes,
    };
  }),
  on(PostsActions.removeLikeFromPostSuccess, (state, { likeId }) => {
    const likesThatIhaveAlreadyGiven = {
      ...state.likesThatIhaveAlreadyGiven,
    };
    delete likesThatIhaveAlreadyGiven[likeId];

    const pendingRemovePostLikes = {
      ...state.pendingRemovePostLikes,
    };
    delete pendingRemovePostLikes[likeId];

    return {
      ...state,
      pendingRemovePostLikes,
      likesThatIhaveAlreadyGiven,
    };
  }),

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PendingState | undefined, action: Action) =>
  PendingReducer(state, action);
