import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostWithoutImage } from '@shared/models/post-without-image.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: PostWithoutImage };
  sortBy: 'latest';
  loading: boolean;
  selectedPostId: string | undefined;
}

export const initialState: PostsState = {
  entities: {},
  sortBy: 'latest',
  loading: false,
  selectedPostId: undefined,
};

const PostsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { posts, postsLikes }) => {
      const entities = createObjectIndexList(posts);
      const myPostsLikes = createObjectIndexList(postsLikes);

      return {
        ...state,
        postsLikes: myPostsLikes,
        entities,
      };
    }
  ),

  on(PostsActions.createPostWithoutImage, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.createPostWithoutImageSuccess, (state, { post }) => ({
    ...state,
    loading: false,
    entities: {
      ...state.entities,
      [post.id]: {
        ...post,
      },
    },
  })),

  on(PostsActions.selectPost, (state, { postId }) => ({
    ...state,
    selectedPostId: postId,
  })),
  on(PostsActions.clearPostSelection, (state) => ({
    ...state,
    selectedPostId: undefined,
    clickedAddComment: false,
  })),
  on(AuthenticatedActions.signOut, (state) => initialState)
);

export const reducer = (state: PostsState | undefined, action: Action) =>
  PostsReducer(state, action);
