import { PostEffects } from './post.effects';
import { PendingPostLikeEffects } from './pending-post-like.effects';
import { PostLikeEffects } from './post-like.effects';

export const effects: any[] = [PostEffects, PendingPostLikeEffects, PostLikeEffects];
