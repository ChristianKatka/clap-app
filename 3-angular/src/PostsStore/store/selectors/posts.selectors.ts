import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedAtDateAscending } from '@shared/helpers/sort-by-created-at-date-ascending';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import {
  PostWithMedia,
  PostWithMediaApiRes
} from '@shared/models/post-with-media.model';
import { Post, PostApiResponse } from '@shared/models/post.model';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import {
  getCommentLikesState,
  getPostsLikesState,
  getPostsState
} from '../reducers';
import {
  attachAllNecessaryDataInsidePost,
  checkIfILikeThisPost,
  getCommentsThatBelongToGivenPostWithlikeInfoInside,
  getLikesThatBelongToGivenPost,
  getNewCommentsThatCameViaSocket
} from '../utils/posts.utils';
import { getSelectedPostLocation } from './location.selectors';
import {
  getNewPostCommentsViaSocket,
  getPostsComments
} from './posts-comments.selectors';


export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);
export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);

const getCommentLikes = createSelector(getCommentLikesState, (state) =>
  Object.values(state.commentsLikes)
);

const getPostLikes = createSelector(getPostsLikesState, (state) =>
  Object.values(state.postsLikes)
);

export const getPosts = createSelector(
  getPostsState,
  getPostLikes,
  getMyProfileState,
  getSortBy,
  getPostsComments,
  getNewPostCommentsViaSocket,
  getCommentLikes,
  getSelectedPostLocation,
  (
    postsState,
    postsLikes,
    profileState,
    sortBy,
    postsComments,
    newCommentsViaSocket,
    commentLikes,
    selectedLocation
  ) => {
    const postEntities: (PostApiResponse | PostWithMediaApiRes)[] =
      Object.values(postsState.entities);

    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const allPosts: (Post | PostWithMedia)[] | [] = postEntities.map(
      (post: PostApiResponse | PostWithMediaApiRes) => {
        const postLikes = getLikesThatBelongToGivenPost(post, postsLikes);
        const iLikeThisPost: PostLikeDraft | PostLike | undefined =
          checkIfILikeThisPost(postLikes, userId, post);
        const comments = getCommentsThatBelongToGivenPostWithlikeInfoInside(
          post,
          postsComments,
          commentLikes,
          userId
        );
        const newComments = getNewCommentsThatCameViaSocket(
          post,
          newCommentsViaSocket
        );

        return attachAllNecessaryDataInsidePost(
          iLikeThisPost,
          post,
          postLikes,
          comments,
          newComments
        );
      }
    );

    const postsBySelectedLocation = allPosts.filter(
      (post) => post.postLocation === selectedLocation
    );

    if (sortBy === 'latest') {
      const sortedPosts: (Post | PostWithMedia)[] =
        sortByCreatedAtDateAscending(postsBySelectedLocation);
      return sortedPosts;
    } else {
      return postsBySelectedLocation;
    }
  }
);

export const getSelectedPost = createSelector(
  getPostsState,
  getPosts,
  (state, posts) => {
    return posts.filter(
      (post: Post | PostWithMedia) => post.id === state.selectedPostId
    )[0];
  }
);
