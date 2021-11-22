import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ImageActions } from './store/actions';
import { ImagesExtendedAppState, ImagesFeatureState } from './store/reducers';
import { ImageSelectors } from './store/selectors';

@Component({
  selector: 'app-image',
  templateUrl: 'image-feature.container.html',
  styleUrls: ['image-feature.container.scss'],
})
export class ImageContainerComponent implements OnInit {

  imageUploading$ = this.store.select(ImageSelectors.getUploadingFileInfo)
  images$ = this.store.select(ImageSelectors.getImages)
  
  constructor(private store: Store<ImagesExtendedAppState>) {}

  ngOnInit() {
    this.store.dispatch(ImageActions.getImages())
  }
}
