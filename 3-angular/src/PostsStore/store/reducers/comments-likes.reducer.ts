import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { deleteFromObjectIndexList } from '@shared/utils/delete-from-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { CommentLikeActions } from '../actions';

export interface CommentsLikesState {
  commentsLikes: { [id: string]: CommentLikeDraft | CommentLike };
}

export const initialState: CommentsLikesState = {
  commentsLikes: {},
};

const CommentsLikesReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { commentsLikes }) => {
      const myCommentsLikes = createObjectIndexList(commentsLikes);
      return {
        ...state,
        commentsLikes: myCommentsLikes,
      };
    }
  ),

  on(CommentLikeActions.giveLikeToComment, (state, { commentLikeDraft }) => {
    const commentsLikes: {
      [id: string]: CommentLikeDraft | CommentLike;
    } = {
      ...state.commentsLikes,
      [commentLikeDraft.id]: commentLikeDraft,
    };

    return {
      ...state,
      commentsLikes,
    };
  }),
  on(CommentLikeActions.giveLikeToCommentSuccess, (state, { like }) => {
    return {
      ...state,
      commentsLikes: {
        ...state.commentsLikes,
        [like.id]: {
          ...like,
        },
      },
    };
  }),

  on(CommentLikeActions.removeLikeFromComment, (state, { like }) => {
    const commentsLikes = deleteFromObjectIndexList(
      state.commentsLikes,
      like.id
    );

    return {
      ...state,
      commentsLikes,
    };
  }),
  on(CommentLikeActions.removeLikeFromCommentSuccess, (state, { likeId }) => {
    const commentsLikes = deleteFromObjectIndexList(
      state.commentsLikes,
      likeId
    );

    return {
      ...state,
      commentsLikes,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: CommentsLikesState | undefined,
  action: Action
) => CommentsLikesReducer(state, action);
