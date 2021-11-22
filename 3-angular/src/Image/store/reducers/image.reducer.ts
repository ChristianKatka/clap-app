import { createReducer, on, Action } from '@ngrx/store';
import { ImageActions } from '../actions';

export interface ImageState {
  entities: { [id: string]: any };
  imageUploading:
    | undefined
    | {
        uploadProgress: number;
      };
}

export const initialState: ImageState = {
  entities: {},
  imageUploading: undefined,
};

const coachExerciseReducer = createReducer(
  initialState,
  on(ImageActions.setUploadingFile, (state, { file }) => ({
    ...state,
    uploading: true,
  })),

  on(ImageActions.setUploadingFileProgress, (state, { progress }) => {
    console.log(progress);

    return {
      ...state,
      imageUploading: { uploadProgress: progress },
    };
  }),

  on(
    ImageActions.storeUploadedImageInformationToDBSuccess,
    (state, { image }) => ({
      ...state,
      imageUploading: undefined,
      entities: {
        ...state.entities,
        [image.id]: {
          ...image,
        },
      },
    })
  ),
  on(ImageActions.getImagesSuccess, (state, { imagesResponse }) => {
    const entities = imagesResponse.reduce(
      (imageEntities: { [id: string]: any }, image: any) => ({
        ...imageEntities,
        [image.id]: image,
      }),
      {}
    );
    return {
      ...state,
      entities,
    };
  })
);

export const reducer = (state: ImageState | undefined, action: Action) =>
  coachExerciseReducer(state, action);
