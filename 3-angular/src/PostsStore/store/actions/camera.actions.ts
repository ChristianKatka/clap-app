import { createAction } from '@ngrx/store';

export const openCamera = createAction('[Camera] Open Camera');
export const closeCamera = createAction('[Camera] Close Camera');

// export const giveLikeToCommentWithoutId = createAction(
//   '[Comments] Give Like To Comment Without Id',
//   props<{ commentId: string }>()
// );
