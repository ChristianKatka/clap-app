import { PostEffects } from './post.effects';
import { PendingPostLikeEffects } from './pending-post-like.effects';
import { PostLikeEffects } from './post-like.effects';
import { PostCommentEffects } from './post-comment.effects';

export const effects: any[] = [
  PostEffects,
  PendingPostLikeEffects,
  PostLikeEffects,
  PostCommentEffects,
];
