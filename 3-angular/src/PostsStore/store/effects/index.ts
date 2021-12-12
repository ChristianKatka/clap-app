import { PostsEffects } from './posts.effects';
import { PendingEffects } from './pending.effects';
import { PostLikeEffects } from './post-like.effect';

export const effects: any[] = [PostsEffects, PendingEffects, PostLikeEffects];
