import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostCommentActions } from '../actions';

export interface PostsCommentsState {
  postsComments: { [id: string]: PostComment | PostCommentDraft };
  newPostCommentViaSocket: { [id: string]: PostComment };
}

export const initialState: PostsCommentsState = {
  postsComments: {},
  newPostCommentViaSocket: {}
};

const PostsCommentsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { postsComments }) => {
      const myPostsComments = createObjectIndexList(postsComments);

      return {
        ...state,
        postsComments: myPostsComments,
      };
    }
  ),

  on(PostCommentActions.createCommentToPost, (state, { postCommentDraft }) => {

    // When i respond to new comment remove new comments and move them to regular comments
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

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (
  state: PostsCommentsState | undefined,
  action: Action
) => PostsCommentsReducer(state, action);
