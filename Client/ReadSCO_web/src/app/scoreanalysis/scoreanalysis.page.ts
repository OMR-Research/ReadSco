import { Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ComponentLoadingDirective } from './directives/component-loading.directive';
import { UploadComponent } from './upload/upload.component';
import { ComponentLoading } from './services/componentloading.service';
import { CropComponent } from './crop/crop.component';
import { SendComponent } from './send/send.component';

@Component({
  selector: 'app-scoreanalysis',
  templateUrl: './scoreanalysis.page.html',
  styleUrls: ['./scoreanalysis.page.scss'],
})
export class ScoreanalysisPage implements OnInit, OnDestroy {

  private components : any[] = [UploadComponent, CropComponent, SendComponent]
  @ViewChild(ComponentLoadingDirective, {static: true}) componentHost : ComponentLoadingDirective;

  constructor(private componentFactory: ComponentFactoryResolver, private componentLoadingService : ComponentLoading) 
  { }

  ngOnInit() 
  {
    this.LoadComponent(0);
    this.componentLoadingService.SetHook(this);
  }

  LoadComponent(index)
  {
    const componentToRender = this.componentFactory.resolveComponentFactory(this.components[index])
    const directiveContainer = this.componentHost.viewContainer;
    directiveContainer.clear();
    directiveContainer.createComponent(componentToRender);
  }

  ngOnDestroy()
  {
  }

}
