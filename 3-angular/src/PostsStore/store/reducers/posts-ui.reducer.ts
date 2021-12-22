import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions, PostsUiActions } from '../actions';

export interface PostsUiState {
  clickedAddComment: boolean;
}

export const initialState: PostsUiState = {
  clickedAddComment: false,
};

const PostsUiReducer = createReducer(
  initialState,

  on(PostsUiActions.clickedAddComment, (state) => ({
    ...state,
    clickedAddComment: true,
  })),
  on(PostsActions.clearPostSelection, (state) => ({
    ...state,
    clickedAddComment: false,
  })),
  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: PostsUiState | undefined, action: Action) =>
  PostsUiReducer(state, action);
