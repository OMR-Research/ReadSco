import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as fromScoreActions from '../store/scoreanalysis.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private scoreStore : Store<fromApp.AppState>, private router: Router) 
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
  }

  uploadFile(event)
  {
    event.preventDefault();
    this.scoreStore.dispatch(new fromScoreActions.ImageLoadStart(event.target.files[0]));
    this.router.navigate(['./scoreanalysis/crop'])
  }

  ClickFileUpload()
  {
    document.getElementById('fileUpload').click();
  }

}
