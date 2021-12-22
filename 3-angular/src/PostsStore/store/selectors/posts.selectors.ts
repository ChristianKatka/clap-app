import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedDate } from '@shared/helpers/sort-by-created-at-time';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { Post, PostApiResponse } from '@shared/models/post.model';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import { getPostsLikesState, getPostsState } from '../reducers';
import { getPostsComments } from './posts-comments.selectors';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);
export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);

export const getPosts = createSelector(
  getPostsState,
  getPostsLikesState,
  getMyProfileState,
  getSortBy,
  getPostsComments,
  (postsState, postsLikesState, profileState, sortBy, postsComments) => {
    const postsApiResponse = Object.values(postsState.postsApiResponse);
    const postsLikes = Object.values(postsLikesState.postsLikes);
    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const posts: Post[] | [] = postsApiResponse.map((post: PostApiResponse) => {
      const postLikes = postsLikes.filter(
        (postLike: PostLike | PostLikeDraft) => post.id === postLike.postId
      );

      const iLikeThisPost: PostLikeDraft | PostLike | undefined =
        postLikes.filter(
          (postLike: PostLike | PostLikeDraft) => postLike.userId === userId
        )[0];
      const comments = sortByCreatedDate(
        postsComments.filter(
          (comment: PostCommentDraft | PostComment) =>
            comment.postId === post.id
        )
      );
      if (iLikeThisPost) {
        return {
          ...post,
          postLikes,
          comments,
          iLikeThisPost: iLikeThisPost.id,
        };
      } else {
        return { ...post, postLikes, comments, iLikeThisPost: undefined };
      }
    });

    if (sortBy === 'latest') {
      const sortedPosts: Post[] = sortByCreatedDate(posts);
      return sortedPosts;
    } else {
      return posts;
    }
  }
);

export const getSelectedPost = createSelector(
  getPostsState,
  getPosts,
  (state, posts) => {
    return posts.filter((post: Post) => post.id === state.selectedPostId)[0];
  }
);
