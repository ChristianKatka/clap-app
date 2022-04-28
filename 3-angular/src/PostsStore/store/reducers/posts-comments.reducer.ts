import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  PostCommentApiResponse,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostCommentActions } from '../actions';

export interface PostsCommentsState {
  postsComments: { [id: string]: PostCommentDraft | PostCommentApiResponse };
  newPostCommentViaSocket: { [id: string]: PostCommentApiResponse };
}

export const initialState: PostsCommentsState = {
  postsComments: {},
  newPostCommentViaSocket: {},
};

const PostsCommentsReducer = createReducer(
  initialState,
  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postsComments }) => ({
      ...state,
      postsComments: createObjectIndexList(postsComments),
    })
  ),
  on(
    PostCommentActions.newPostCommentHappenedViaSocket,
    (state, { postComment }) => {
      return {
        ...state,
        newPostCommentViaSocket: {
          ...state.newPostCommentViaSocket,
          [postComment.id]: {
            ...postComment,
          },
        },
      };
    }
  ),

  on(PostCommentActions.createCommentToPost, (state, { postCommentDraft }) => {
    // When user responds to new comment that came via socket remove new comments and move them to regular comments
    const postsComments: { [id: string]: PostCommentDraft } = {
      ...state.postsComments,
      ...state.newPostCommentViaSocket,
      [postCommentDraft.id]: postCommentDraft,
    };

    return {
      ...state,
      newPostCommentViaSocket: {},
      postsComments,
    };
  }),
  on(
    PostCommentActions.createCommentToPostSuccess,
    (state, { postComment }) => {
      return {
        ...state,
        postsComments: {
          ...state.postsComments,
          [postComment.id]: {
            ...postComment,
          },
        },
      };
    }
  ),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: PostsCommentsState | undefined,
  action: Action
) => PostsCommentsReducer(state, action);
