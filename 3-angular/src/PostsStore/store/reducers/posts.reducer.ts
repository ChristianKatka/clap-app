import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostApiResponse } from '@shared/models/post.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { ProfileImageActions } from 'src/MyProfile/store/actions';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  postsApiResponse: { [id: string]: PostApiResponse };
  postsWithImage: { [id: string]: any };
  sortBy: 'latest';
  loading: boolean;
  selectedPostId: string | undefined;
  imageUploadProgressAmount: number | undefined;
}

export const initialState: PostsState = {
  postsApiResponse: {},
  postsWithImage: {},
  sortBy: 'latest',
  loading: false,
  selectedPostId: undefined,
  imageUploadProgressAmount: undefined,
};

const PostsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { PostApiResponse }) => {
      return {
        ...state,
        postsApiResponse: createObjectIndexList(PostApiResponse),
      };
    }
  ),

  on(PostsActions.createPost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.createPostSuccess, (state, { PostApiResponse }) => ({
    ...state,
    loading: false,
    postsApiResponse: {
      ...state.postsApiResponse,
      [PostApiResponse.id]: {
        ...PostApiResponse,
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
  on(
    ProfileImageActions.storeUploadedProfileImageInformationToDBSuccess,
    (state, { image }) => {
      const myPosts = Object.values(state.postsApiResponse).filter(
        (post: PostApiResponse) => post.userId === image.userId
      );

      const myPostsWithProfileImageChanged = myPosts.map(
        (post: PostApiResponse) => ({
          ...post,
          creatorsProfileImage: image.imageUrl,
        })
      );

      return {
        ...state,
        postsApiResponse: {
          ...state.postsApiResponse,
          ...createObjectIndexList(myPostsWithProfileImageChanged),
        },
      };
    }
  ),

  // POSTS WITH IMAGE
  on(PostsActions.setupCreatingPostWithImage, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.setupCreatingPostWithImage, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    PostsActions.setPostImageUploadProgressAmount,
    (state, { imageUploadProgressAmount }) => ({
      ...state,
      loading: true,
      imageUploadProgressAmount,
    })
  ),

  on(AuthenticatedActions.signOut, () => initialState)
);

export const reducer = (state: PostsState | undefined, action: Action) =>
  PostsReducer(state, action);
