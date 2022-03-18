import { HomeFeatureContainerComponent } from './home-feature.container';
import { HomeTopBarComponent } from './home-top-bar/home-top-bar.component';
import { ChangeLocationBottomSheetSearchFormComponent } from './location/change-location-bottom-sheet/change-location-bottom-sheet-search-form/change-location-bottom-sheet-search-form.component';
import { ChangeLocationBottomSheetComponent } from './location/change-location-bottom-sheet/change-location-bottom-sheet.component';
import { ChangeLocationBottomSheetContainerComponent } from './location/change-location-bottom-sheet/change-location-bottom-sheet.container';
import { LocationComponent } from './location/location.component';
import { LocationContainerComponent } from './location/location.container';
import { PostContainerComponent } from './post/post.container';
import { PostsContainerComponent } from './posts/posts.container';

export const components: any[] = [
  HomeFeatureContainerComponent,
  HomeTopBarComponent,
  PostsContainerComponent,
  PostContainerComponent,
  LocationContainerComponent,
  LocationComponent,
  ChangeLocationBottomSheetContainerComponent,
  ChangeLocationBottomSheetSearchFormComponent,
  ChangeLocationBottomSheetComponent,
];
