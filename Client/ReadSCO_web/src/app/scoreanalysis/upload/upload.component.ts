import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ComponentLoading } from '../services/componentloading.service';
import * as fromApp from '../../store/app.reducer';
import * as fromScoreActions from '../store/scoreanalysis.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private componentLoadingService : ComponentLoading, private scoreStore : Store<fromApp.AppState>) 
  { }

  ngOnInit() {}

  public dragToUploadZone(event)
  {
    event.preventDefault();
  }
  public dropInZone(event)
  {
    event.preventDefault();
    this.scoreStore.dispatch(new fromScoreActions.ImageLoadStart(event.dataTransfer.files[0]));
    this.componentLoadingService.ChangeComponent(1);
  }

  uploadFile(event)
  {
    event.preventDefault();
    this.scoreStore.dispatch(new fromScoreActions.ImageLoadStart(event.target.files[0]));
    this.componentLoadingService.ChangeComponent(1);
  }

  ClickFileUpload()
  {
    document.getElementById('fileUpload').click();
  }

}
