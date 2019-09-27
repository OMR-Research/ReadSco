import { Component, OnInit } from '@angular/core';
import { VerovioService } from '../services/verovio-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-score-render',
  templateUrl: './score-render.component.html',
  styleUrls: ['./score-render.component.scss'],
})

export class ScoreRenderComponent implements OnInit {

  //private data = ``;
  private data = `**kern
4c
4d
4e
4f
*-`;
  
  public renderedSVG;

  constructor(private verovioService : VerovioService, private sanitizer : DomSanitizer) 
  { 

  }

  ngOnInit() 
  {
    this.renderedSVG = this.verovioService.renderScore(this.data)
  }

}
