import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer'

import { EffectsModule } from '@ngrx/effects';
import {ScoreAnalysisEffects} from './scoreanalysis/store/scoreanalysis.effects'
import { ScoreVisualizationEffects } from './scorevisualization/store/scorevisualization.effects';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({animated:false}), 
    AppRoutingModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    FlexLayoutModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([ScoreAnalysisEffects, ScoreVisualizationEffects]),
    HttpClientModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    FileReader,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
