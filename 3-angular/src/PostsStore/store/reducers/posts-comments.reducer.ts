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
}

export const initialState: PostsCommentsState = {
  postsComments: {},
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
    const postsComments: { [id: string]: PostCommentDraft } = {
      ...state.postsComments,
      [postCommentDraft.id]: postCommentDraft,
    };

    return {
      ...state,
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
