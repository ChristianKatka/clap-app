import { createSelector } from '@ngrx/store';
//  I COULD USE LOADSH INSTEAD
import { sortByCreatedAtDateAscending } from '@shared/helpers/sort-by-created-at-date-ascending';
import { sortByCreatedAtDateDescending } from '@shared/helpers/sort-by-created-at-date-descending';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import {
  PostComment,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import {
  PostWithMedia,
  PostWithMediaApiRes,
} from '@shared/models/post-with-media.model';
import { Post, PostApiResponse } from '@shared/models/post.model';
import { getMyProfileState } from '../../../MyProfile/store/reducers';
import {
  getCommentLikesState,
  getPostsLikesState,
  getPostsState,
} from '../reducers';
import {
  getNewPostCommentsViaSocket,
  getPostsComments,
} from './posts-comments.selectors';

export const getSortBy = createSelector(getPostsState, (state) => state.sortBy);
export const isLoading = createSelector(
  getPostsState,
  (state) => state.loading
);

const getCommentLikes = createSelector(getCommentLikesState, (state) =>
  Object.values(state.commentsLikes)
);

export const getPosts = createSelector(
  getPostsState,
  getPostsLikesState,
  getMyProfileState,
  getSortBy,
  getPostsComments,
  getNewPostCommentsViaSocket,
  getCommentLikes,
  (
    postsState,
    postsLikesState,
    profileState,
    sortBy,
    postsComments,
    newCommentsViaSocket,
    commentLikes
  ) => {
    const postEntities: (PostApiResponse | PostWithMediaApiRes)[] =
      Object.values(postsState.entities);
    const postsLikes = Object.values(postsLikesState.postsLikes);
    const userId = profileState.myProfile?.id;
    if (!userId) return [];

    const posts: (Post | PostWithMedia)[] | [] = postEntities.map(
      (post: PostApiResponse | PostWithMediaApiRes) => {
        const postLikes = postsLikes.filter(
          (postLike: PostLike | PostLikeDraft) => post.id === postLike.postId
        );

        const iLikeThisPost: PostLikeDraft | PostLike | undefined =
          postLikes.filter(
            (postLike: PostLike | PostLikeDraft) => postLike.userId === userId
          )[0];
        const comments = postsComments.filter(
          (comment: PostCommentDraft | PostComment) =>
            comment.postId === post.id
        );
        const newComments = newCommentsViaSocket.filter(
          (comment: PostCommentDraft | PostComment) =>
            comment.postId === post.id
        );

        // TODO KATO MITEN SAAT TYKKÄYS TIEDON KOMMENTIN SISÄÄN
        const commentsWithIlikeThisInfoInside = comments.map((comment: any) => {
          const iLikeThisComment: CommentLikeDraft | CommentLike | undefined =
            commentLikes.filter(
              (commentLike: CommentLike | CommentLikeDraft) =>
                commentLike.userId === comment.userId
            )[0];
          if (iLikeThisComment) {
            return { ...comment, iLikeThisComment: iLikeThisComment.id };
          } else {
            return { ...comment, iLikeThisComment: undefined };
          }
        });

        if (iLikeThisPost) {
          return {
            ...post,
            postLikes,
            comments: sortByCreatedAtDateDescending(comments),
            newComments,
            iLikeThisPost: iLikeThisPost.id,
          };
        } else {
          return {
            ...post,
            postLikes,
            comments: sortByCreatedAtDateDescending(comments),
            newComments,
            iLikeThisPost: undefined,
          };
        }
      }
    );

    if (sortBy === 'latest') {
      console.log('sort by latest');

      const sortedPosts: (Post | PostWithMedia)[] =
        sortByCreatedAtDateAscending(posts);
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
    return posts.filter(
      (post: Post | PostWithMedia) => post.id === state.selectedPostId
    )[0];
  }
);
