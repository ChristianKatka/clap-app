import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyImageService {
  constructor(private http: HttpClient) {}

  public getSignedUrlForUploadingImage(image: {
    name: string;
    mimeType: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/get-signed-url-for-uploading-image`,
      image
    );
  }

  public storeUploadedImageInformationToDB(
    name: string,
    mimeType: string
  ): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/store-uploaded-image-information`,
      { name, mimeType }
    );
  }

  public deleteImage(imageId: string): Observable<any> {
    return this.http.delete(
      `${environment.apiBaseUrl}/delete-image/${imageId}`
    );
  }

  public getImages(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/images`);
  }
}
