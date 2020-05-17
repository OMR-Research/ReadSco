import { Component, OnInit, AfterViewInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { VerovioService } from '../services/verovio-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MidiPlayerService } from '../services/midi-player.service';
import { Store, select, State } from '@ngrx/store';
import { ScoreVisState } from '../store/scorevisualization.reducer';
import { selectScoreTranscription } from '../store/scorevisualization.selector';
import { ScoreAnState } from '../../scoreanalysis/store/scoreanalysis.reducer'
import { Observable } from 'rxjs';
import { selectOriginalImage } from 'src/app/scoreanalysis/store/scoreanalysis.selector';


@Component({
  selector: 'app-score-render',
  templateUrl: './score-render.component.html',
  styleUrls: ['./score-render.component.scss'],
})

export class ScoreRenderComponent implements OnInit{
  //private data = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<?xml-model href=\"http://music-encoding.org/schema/4.0.0/mei-all.rng\" type=\"application/xml\" schematypens=\"http://relaxng.org/ns/structure/1.0\"?>\n<?xml-model href=\"http://music-encoding.org/schema/4.0.0/mei-all.rng\" type=\"application/xml\" schematypens=\"http://purl.oclc.org/dsdl/schematron\"?>\n<mei xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns=\"http://www.music-encoding.org/ns/mei\" meiversion=\"4.0.0\">\n\t<meiHead>\n\t\t<fileDesc>\n\t\t\t<titleStmt>\n\t\t\t\t<title></title>\n\t\t\t</titleStmt>\n\t\t\t<pubStmt/>\n\t\t</fileDesc>\n\t\t<encodingDesc>\n\t\t\t<appInfo>\n\t\t\t\t<application>\n\t\t\t\t\t<name>IM3 Java Library © David Rizo</name>\n\t\t\t\t</application>\n\t\t\t</appInfo>\n\t\t</encodingDesc>\n\t</meiHead>\n\t<music>\n\t\t<body>\n\t\t\t<mdiv>\n\t\t\t\t<score>\n\t\t\t\t\t<scoreDef meter.sym=\"common\" key.sig=\"1f\">\n\t\t\t\t\t\t<staffGrp>\n\t\t\t\t\t\t\t<staffDef n=\"1\" clef.line=\"3\" clef.shape=\"C\" lines=\"5\" label=\"Converted\"/>\n\t\t\t\t\t\t</staffGrp>\n\t\t\t\t\t</scoreDef>\n\t\t\t\t\t<section>\n\t\t\t\t\t\t<scoreDef meter.sym=\"common\" key.sig=\"1f\"/>\n\t\t\t\t\t\t<measure n=\"1\" xml:id=\"M3\">\n\t\t\t\t\t\t\t<staff n=\"1\">\n\t\t\t\t\t\t\t\t<layer n=\"1\">\n\t\t\t\t\t\t\t\t\t<rest xml:id=\"A5\" dur=\"1\" loc=\"6\"/>\n\t\t\t\t\t\t\t\t</layer>\n\t\t\t\t\t\t\t</staff>\n\t\t\t\t\t\t</measure>\n\t\t\t\t\t</section>\n\t\t\t\t</score>\n\t\t\t</mdiv>\n\t\t</body>\n\t</music>\n</mei>\n";
  scoreToRender: Observable<string>;
  public renderedSVG;
  public isScoreLoaded: boolean;
  public isScorePlayable: boolean;
  public comparingToggled: boolean;
  public originalImage: string;

  constructor(private verovioService : VerovioService, private sanitizer : DomSanitizer, private midiService : MidiPlayerService,
    private renderer: Renderer2, private scoreStore: Store<ScoreVisState>, private scoreAnStore: Store<ScoreAnState>) 
  { 
    this.isScoreLoaded = false;
    this.comparingToggled = false;
    this.midiService.setRender(renderer)
    this.scoreToRender = this.scoreStore.pipe(select(selectScoreTranscription))
    this.scoreAnStore.pipe(select(selectOriginalImage)).subscribe(data => {
        this.originalImage = data;
    })
    this.scoreToRender.subscribe(result => {
        if(result!="")
        {
            console.log("Response received")
            this.renderedSVG = this.verovioService.renderScore(result)
            this.midiService.loadScore(this.verovioService.getMIDI())
            this.isScoreLoaded = true
            setTimeout(()=>{this.renderScoreAndStartPlayer()}, 1.0*3000)
        }
    })
  }

  ngOnInit() 
  {
    console.log("Started")
  }

  renderScoreAndStartPlayer()
  {
    let noteList = document.querySelectorAll('.note');
    let definitiveList = []
    noteList.forEach((note)=>{
      definitiveList.push(note.children[0]);
      definitiveList.push(note.children[1]);
    })
    this.midiService.setList(definitiveList)
    this.isScorePlayable = true;
    this.isScoreLoaded = true;
  }

  getNotes()
  {

  }

  onDownloadClick()
  {
    document.querySelector('ion-select').click();
  }

  startPlaying()
  {
    if(this.isScorePlayable)
        this.midiService.startPlaying()
  }

  toggleComparison()
  {
      console.log(this.originalImage);
      this.comparingToggled = !this.comparingToggled;
  }

}
