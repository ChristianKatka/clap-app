import { CommentLikeEffects } from './comment-like.effects';
import { PendingCommentLikeEffects } from './pending-comment-like.effects';
import { PendingPostLikeEffects } from './pending-post-like.effects';
import { PostCommentUIEffects } from './post-comment-ui.effects';
import { PostCommentEffects } from './post-comment.effects';
import { PostLikeEffects } from './post-like.effects';
import { PostEffects } from './post.effects';
import { PostNotificationEffects } from './post-notification.effects';
import { LocationEffects } from './location.effects';

export const effects: any[] = [
  PostEffects,
  PendingPostLikeEffects,
  PostLikeEffects,
  PostCommentEffects,
  CommentLikeEffects,
  PendingCommentLikeEffects,
  PostCommentUIEffects,
  PostNotificationEffects,
  LocationEffects,
];
