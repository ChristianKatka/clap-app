import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';

export interface PendingState {
  DBtruthOfPostLikes: { [id: string]: PostLike };
  pendingPostLikes: { [id: string]: PostLikeDraft };
  pendingRemovePostLikes: { [id: string]: PostLike | PostLikeDraft };
  likesThatIhaveAlreadyGiven: { [id: string]: PostLike | PostLikeDraft };
}

export const initialState: PendingState = {
  DBtruthOfPostLikes: {},
  pendingPostLikes: {},
  pendingRemovePostLikes: {},
  likesThatIhaveAlreadyGiven: {},
};

const PendingReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postsLikes }) => {
      return {
        ...state,
        DBtruthOfPostLikes: createObjectIndexList(postsLikes),
      };
    }
  ),

  on(PostsActions.giveLikeToPost, (state, { postLikeDraft }) => {
    const pendingPostLikes: { [id: string]: PostLikeDraft } = {
      ...state.pendingPostLikes,
      [postLikeDraft.id]: {
        id: postLikeDraft.id,
        postId: postLikeDraft.postId,
        userId: postLikeDraft.userId,
      },
    };

    return {
      ...state,
      pendingPostLikes,
    };
  }),
  on(PostsActions.giveLikeToPostSuccess, (state, { like }) => {
    const pendingPostLikes = deleteFromObjectIndexList(
      state.pendingPostLikes,
      like.id
    );

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
    const pendingPostLikes = deleteFromObjectIndexList(
      state.pendingPostLikes,
      like.id
    );

    return {
      ...state,
      pendingRemovePostLikes,
      likesThatIhaveAlreadyGiven,
      pendingPostLikes,
    };
  }),
  on(PostsActions.removeLikeFromPostSuccess, (state, { likeId }) => {
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

  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PendingState | undefined, action: Action) =>
  PendingReducer(state, action);
