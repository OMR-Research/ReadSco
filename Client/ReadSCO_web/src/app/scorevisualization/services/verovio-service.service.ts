import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var verovio: any;

@Injectable({
  providedIn: 'root'
})

export class VerovioService 
{
  private vrvToolkit : any
  
  constructor(private sanitizer : DomSanitizer) 
  {
    this.vrvToolkit = new verovio.toolkit();
  }

  //Returns a rendered score SVG
  renderScore(data)
  {
    console.log(data);
    this.vrvToolkit.loadData(data);
    let svgToRender = this.vrvToolkit.renderToSVG(1, {});
    return this.sanitizer.bypassSecurityTrustHtml(svgToRender);
  }
}
