import {
  createFeatureSelector,
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

import * as fromImages from './image.reducer';

export const featureKey = 'images';
export interface ImagesFeatureState {
  images: fromImages.ImageState;
}
export interface ImagesExtendedAppState extends AppState {
  images: ImagesFeatureState;
}

export const reducers: ActionReducerMap<ImagesFeatureState> = {
  images: fromImages.reducer,
};

const getImagesFeatureState =
  createFeatureSelector<ImagesFeatureState>(featureKey);

const getImages = createFeatureSelector<fromImages.ImageState>('images');

export const getImagesState = createSelector(getImagesFeatureState, getImages);
