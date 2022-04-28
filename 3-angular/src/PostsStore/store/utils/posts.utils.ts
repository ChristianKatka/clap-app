import { sortByCreatedAtDateDescending } from '@shared/helpers/sort-by-created-at-date-descending';
import {
  CommentLike,
  CommentLikeDraft,
} from '@shared/models/comment-like.model';
import {
  PostComment,
  PostCommentApiResponse,
  PostCommentDraft,
} from '@shared/models/post-comment.model';
import { PostLike, PostLikeDraft } from '@shared/models/post-like.model';
import { PostWithMediaApiRes } from '@shared/models/post-with-media.model';
import { PostApiResponse } from '@shared/models/post.model';

export const getLikesThatBelongToGivenPost = (
  post: PostApiResponse | PostWithMediaApiRes,
  postsLikes: (PostLikeDraft | PostLike)[]
) => {
  return postsLikes.filter(
    (postLike: PostLike | PostLikeDraft) => post.id === postLike.postId
  );
};

export const checkIfILikeThisPost = (
  postLikes: (PostLikeDraft | PostLike)[],
  userId: string,
  post: PostApiResponse | PostWithMediaApiRes
) => {
  return postLikes.filter(
    (postLike: PostLike | PostLikeDraft) =>
      postLike.userId === userId && post.id === postLike.postId
  )[0];
};

export const isCommentTypeApiRes = (
  comment: PostCommentApiResponse | PostCommentDraft
): comment is PostCommentApiResponse => {
  return (<PostCommentApiResponse>comment).userId !== undefined;
};

export const getCommentsThatBelongToGivenPostWithLikeInfoInside = (
  post: PostApiResponse | PostWithMediaApiRes,
  postsComments: (PostCommentDraft | PostCommentApiResponse)[],
  commentsLikes: (CommentLikeDraft | CommentLike)[],
  userId: string
) => {
  const postcomments = postsComments.filter(
    (comment: PostCommentDraft | PostComment) => comment.postId === post.id
  );

  const commentsWithIlikeInfoInside = postcomments.map(
    (comment: PostCommentApiResponse | PostCommentDraft) => {
      // if comment is in draft state you cant like it
      if (!isCommentTypeApiRes(comment))
        return { ...comment, iLikeThisComment: undefined };

      const iLikeThisComment: CommentLikeDraft | CommentLike | undefined =
        commentsLikes.filter(
          (commentLike: CommentLikeDraft | CommentLike) =>
            commentLike.userId === userId &&
            commentLike.commentId === comment.id
        )[0];

      const commentLikes = commentsLikes.filter(
        (like: CommentLikeDraft | CommentLike) => like.commentId === comment.id
      );

      if (iLikeThisComment) {
        return {
          ...comment,
          commentLikes,
          iLikeThisComment: iLikeThisComment.id,
        };
      } else {
        return { ...comment, commentLikes, iLikeThisComment: undefined };
      }
    }
  );

  return commentsWithIlikeInfoInside;
};

export const getNewCommentsThatCameViaSocket = (
  post: PostApiResponse | PostWithMediaApiRes,
  newCommentsViaSocket: (PostCommentDraft | PostCommentApiResponse)[]
) => {
  const newComments = newCommentsViaSocket.filter(
    (comment: PostCommentDraft | PostComment) => comment.postId === post.id
  );
  return newComments.map((comment) => ({
    ...comment,
    iLikeThisComment: undefined,
  }));
};

export const attachAllNecessaryDataInsidePost = (
  iLikeThisPost: PostLikeDraft | PostLike | undefined,
  post: PostApiResponse | PostWithMediaApiRes,
  postLikes: (PostLikeDraft | PostLike)[],
  comments: (PostCommentDraft | PostCommentApiResponse | PostComment)[],
  newComments: (PostCommentDraft | PostCommentApiResponse | PostComment)[]
) => {
  if (iLikeThisPost) {
    return {
      ...post,
      postLikes,
      comments: sortByCreatedAtDateDescending(comments),
      newComments: sortByCreatedAtDateDescending(newComments),
      iLikeThisPost: iLikeThisPost.id,
    };
  } else {
    return {
      ...post,
      postLikes,
      comments: sortByCreatedAtDateDescending(comments),
      newComments: sortByCreatedAtDateDescending(newComments),
      iLikeThisPost: undefined,
    };
  }
};
