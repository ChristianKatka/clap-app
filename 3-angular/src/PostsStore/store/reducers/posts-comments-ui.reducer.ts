import { Action, createReducer, on } from '@ngrx/store';
import { CommentUI } from '@shared/models/comment-ui.model';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostCommentActions, PostCommentUIActions } from '../actions';

export interface PostsCommentsUIState {
  commentUiStatus: CommentUI;
}

export const initialState: PostsCommentsUIState = {
  commentUiStatus: {
    showNewMessagesBelowPopUp: false,
    iCreatedNewComment: false,
  },
};

const PostsCommentsUIReducer = createReducer(
  initialState,

  on(PostCommentUIActions.showNewMessagesBelowPopUp, (state) => {
    const commentUiStatus: CommentUI = {
      showNewMessagesBelowPopUp: true,
      iCreatedNewComment: false,
    };
    return {
      ...state,
      commentUiStatus,
    };
  }),
  on(PostCommentUIActions.hideNewMessagesBelowPopUp, (state) => {
    const commentUiStatus: CommentUI = {
      showNewMessagesBelowPopUp: false,
      iCreatedNewComment: false,
    };
    return {
      ...state,
      commentUiStatus,
    };
  }),
  on(PostCommentUIActions.iCreatedNewComment, (state) => {
    const commentUiStatus: CommentUI = {
      showNewMessagesBelowPopUp: false,
      iCreatedNewComment: true,
    };
    return {
      ...state,
      commentUiStatus,
    };
  }),

  on(PostCommentActions.createCommentToPostSuccess, (state) => {
    const commentUiStatus: CommentUI = {
      showNewMessagesBelowPopUp: false,
      iCreatedNewComment: false,
    };
    return {
      ...state,
      commentUiStatus,
    };
  }),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: PostsCommentsUIState | undefined,
  action: Action
) => PostsCommentsUIReducer(state, action);
