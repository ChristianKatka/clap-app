import { Action, createReducer, on } from '@ngrx/store';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { CommentLikeActions } from '../actions';

export interface PendingCommentLikesState {
  pendingCommentLikes: { [id: string]: CommentLikeDraft };
  pendingRemoveCommentLikes: { [id: string]: CommentLike | CommentLikeDraft };
  // USED to check if there is a need to create new id for like
  likesThatIhaveAlreadyGiven: { [id: string]: CommentLike | CommentLikeDraft };
}

export const initialState: PendingCommentLikesState = {
  pendingCommentLikes: {},
  pendingRemoveCommentLikes: {},
  likesThatIhaveAlreadyGiven: {},
};

const PendingCommentLikesReducer = createReducer(
  initialState,

  on(CommentLikeActions.giveLikeToComment, (state, { commentLikeDraft }) => {
    const pendingCommentLikes: { [id: string]: CommentLikeDraft } = {
      ...state.pendingCommentLikes,
      [commentLikeDraft.id]: {
        id: commentLikeDraft.id,
        commentId: commentLikeDraft.commentId,
        userId: commentLikeDraft.userId,
      },
    };

    // there shouldnt be pending like and unlike at the same time to the same comment
    const pendingRemoveCommentLikes = deleteFromObjectIndexList(
      state.pendingRemoveCommentLikes,
      commentLikeDraft.id
    );

    return {
      ...state,
      pendingCommentLikes,
      pendingRemoveCommentLikes,
    };
  }),
  on(CommentLikeActions.giveLikeToCommentSuccess, (state, { like }) => {
    const pendingCommentLikes = deleteFromObjectIndexList(
      state.pendingCommentLikes,
      like.id
    );

    return {
      ...state,
      pendingCommentLikes,
    };
  }),

  on(CommentLikeActions.removeLikeFromComment, (state, { like }) => {
    // save that i have previosly liked this comment
    const likesThatIhaveAlreadyGiven = {
      ...state.likesThatIhaveAlreadyGiven,
      [like.id]: like,
    };

    const pendingRemoveCommentLikes = {
      ...state.pendingRemoveCommentLikes,
      [like.id]: like,
    };

    // there shouldnt be pending like and unlike at the same time to the same comment
    const pendingCommentLikes = deleteFromObjectIndexList(
      state.pendingCommentLikes,
      like.id
    );

    return {
      ...state,
      pendingRemoveCommentLikes,
      pendingCommentLikes,
      likesThatIhaveAlreadyGiven,
    };
  }),
  on(CommentLikeActions.removeLikeFromCommentSuccess, (state, { likeId }) => {
    const likesThatIhaveAlreadyGiven = deleteFromObjectIndexList(
      state.likesThatIhaveAlreadyGiven,
      likeId
    );

    const pendingRemoveCommentLikes = deleteFromObjectIndexList(
      state.pendingRemoveCommentLikes,
      likeId
    );

    return {
      ...state,
      pendingRemoveCommentLikes,
      likesThatIhaveAlreadyGiven,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: PendingCommentLikesState | undefined,
  action: Action
) => PendingCommentLikesReducer(state, action);
