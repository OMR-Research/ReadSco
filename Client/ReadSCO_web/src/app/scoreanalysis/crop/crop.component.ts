import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromScoreActions from '../store/scoreanalysis.actions';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss'],
})
export class CropComponent implements OnInit, OnDestroy {

  public imageSRC: string | ArrayBuffer;
  private imageChangeEvent: any;
  private storeSubscription : Subscription;
  private croppedImage : string;
  

  constructor(private scoreStore : Store<fromApp.AppState>, private router: Router) 
  {
  }

  ngOnInit() 
  {
    this.storeSubscription = this.scoreStore.select('scoreAnalysis').subscribe(loadState => {
      if(loadState.imageString != null)
      {
        this.imageSRC = loadState.imageString;
      }
    })
  }

  ngOnDestroy()
  {
    this.storeSubscription.unsubscribe();
  }

  fileChangeEvent(event: any): void 
  {
    
  }
  imageCropped(event: ImageCroppedEvent) 
  {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
  }

  public GoBack()
  {
    this.router.navigate(['./scoreanalysis'])
  }
  public ToFinalScreen()
  {
    console.log(this.croppedImage);
    
    //TODO - Make a dispatch
    //this.scoreanalysisService.SetCroppedImage(this.croppedImage);
    this.scoreStore.dispatch(new fromScoreActions.CropImage(this.croppedImage));
    this.router.navigate(['./scoreanalysis/confirm'])
  }

}
