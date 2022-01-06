import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { AppState } from '../../../app/store/reducers';
import * as fromCommentLikes from './comments-likes.reducer';
import * as fromPendingCommentLikes from './pending-comment-likes.reducer';
import * as fromPendingPostLikes from './pending-posts-likes.reducer';
import * as fromPostsComments from './posts-comments.reducer';
import * as fromPostsLikes from './posts-likes.reducer';
import * as fromPostsUi from './posts-ui.reducer';
import * as fromPosts from './posts.reducer';

export const featureKey = 'post';
export interface PostsFeatureState {
  posts: fromPosts.PostsState;
  postsUi: fromPostsUi.PostsUiState;
  postsLikes: fromPostsLikes.PostsLikesState;
  postsComments: fromPostsComments.PostsCommentsState;
  pendingPostLikes: fromPendingPostLikes.PendingPostLikesState;
  commentsLikes: fromCommentLikes.CommentsLikesState;
  pendingCommentLikes: fromPendingCommentLikes.PendingCommentLikesState;
}

export interface PostsExtendedAppState extends AppState {
  post: PostsFeatureState;
}

export const reducers: ActionReducerMap<PostsFeatureState> = {
  posts: fromPosts.reducer,
  postsUi: fromPostsUi.reducer,
  postsLikes: fromPostsLikes.reducer,
  postsComments: fromPostsComments.reducer,
  pendingPostLikes: fromPendingPostLikes.reducer,
  commentsLikes: fromCommentLikes.reducer,
  pendingCommentLikes: fromPendingCommentLikes.reducer,
};

const getPostsFeatureState =
  createFeatureSelector<PostsFeatureState>(featureKey);

const getPosts = createFeatureSelector<fromPosts.PostsState>('posts');
export const getPostsState = createSelector(getPostsFeatureState, getPosts);

const getPostsUi = createFeatureSelector<fromPostsUi.PostsUiState>('postsUi');
export const getPostsUiState = createSelector(getPostsFeatureState, getPostsUi);

const getPostsLikes =
  createFeatureSelector<fromPostsLikes.PostsLikesState>('postsLikes');
export const getPostsLikesState = createSelector(
  getPostsFeatureState,
  getPostsLikes
);

const getPostsComments =
  createFeatureSelector<fromPostsComments.PostsCommentsState>('postsComments');
export const getPostsCommentsState = createSelector(
  getPostsFeatureState,
  getPostsComments
);

const getPendingPostLikes =
  createFeatureSelector<fromPendingPostLikes.PendingPostLikesState>(
    'pendingPostLikes'
  );
export const getPendingPostLikesState = createSelector(
  getPostsFeatureState,
  getPendingPostLikes
);

const getPendingCommentLikes =
  createFeatureSelector<fromPendingCommentLikes.PendingCommentLikesState>(
    'pendingCommentLikes'
  );
export const getPendingCommentLikesState = createSelector(
  getPostsFeatureState,
  getPendingCommentLikes
);

const getCommentLikes =
  createFeatureSelector<fromCommentLikes.CommentsLikesState>(
    'commentsLikes'
  );
export const getCommentLikesState = createSelector(
  getPostsFeatureState,
  getCommentLikes
);
