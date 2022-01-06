import { InitActions } from '@app/store/actions';
import { Action, createReducer, on } from '@ngrx/store';
import { PostWithMediaApiRes } from '@shared/models/post-with-media.model';
import { PostApiResponse } from '@shared/models/post.model';
import { createObjectIndexList } from '@shared/utils/create-object-index-list';
import { ProfileImageActions } from 'src/MyProfile/store/actions';
import { AuthenticatedActions } from '../../../Auth/store/actions';
import { PostsActions } from '../actions';

export interface PostsState {
  entities: { [id: string]: PostApiResponse | PostWithMediaApiRes };
  sortBy: 'latest';
  loading: boolean;
  selectedPostId: string | undefined;
  imageUploadProgressAmount: number | undefined;
}

export const initialState: PostsState = {
  entities: {},
  sortBy: 'latest',
  loading: false,
  selectedPostId: undefined,
  imageUploadProgressAmount: undefined,
};

const PostsReducer = createReducer(
  initialState,

  on(
    InitActions.loadApplicationInitializeDataSuccess,
    (state, { PostsApiResponse }) => {
      return {
        ...state,
        entities: createObjectIndexList(PostsApiResponse),
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
    entities: {
      ...state.entities,
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
      const myPosts = Object.values(state.entities).filter(
        (post: PostApiResponse | PostWithMediaApiRes) =>
          post.userId === image.userId
      );

      const myPostsWithProfileImageChanged = myPosts.map(
        (post: PostApiResponse | PostWithMediaApiRes) => ({
          ...post,
          creatorsProfileImage: image.imageUrl,
        })
      );

      return {
        ...state,
        entities: {
          ...state.entities,
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
