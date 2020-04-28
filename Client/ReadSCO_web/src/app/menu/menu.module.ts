import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    declarations: [MenuComponent],
    exports: [MenuComponent]
  })
  export class MenuModule {}