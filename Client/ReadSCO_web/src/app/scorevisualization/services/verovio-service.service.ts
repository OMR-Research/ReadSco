import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var verovio: any;
declare var Soundfont:any;

let optionsScore = {
  scale: 70,
  adjustPageHeight: 1,
  breaks: 'encoded',
  evenNoteSpacing: 1
};

@Injectable()
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
    this.vrvToolkit.setOptions(optionsScore);
    this.vrvToolkit.loadData(data);
    let svgToRender = this.vrvToolkit.renderToSVG(1, {});
    return svgToRender
  }

  getMIDI()
  {
    return this.vrvToolkit.renderToMIDI()
  }
}
