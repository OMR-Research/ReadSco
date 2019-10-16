import { Injectable, Renderer2 } from '@angular/core';

import * as fromApp from './../../store/app.reducer'
import * as SVActions from './../store/scorevisualization.actions'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {Player} from 'midi-player-ts'

@Injectable()
export class MidiPlayerService {

  midiPlayer: any;
  storeSubscription: Subscription
  midiCommandGiver: Player

  timer:number

  public noteList;
  public originalNoteList;

  loadedScoreMidiNotes: any[] = []
  midiNotes: any[] = []

  renderer : Renderer2;

  highlited: boolean;

  tickTime: number;
  tempo: number;

  constructor(private store : Store<fromApp.AppState>) 
  { 
    this.storeSubscription = this.store.select('scoreVisualization').subscribe(loadState => {
      if(loadState.midiPlayer != null)
      {
        this.midiPlayer = loadState.midiPlayer;
        this.tempo = 186.0;
        this.tickTime = (60000.0 / (120.0 * this.tempo)) / 1000;
        console.log(this.tickTime)
        console.log('Ready to play!!')
      }
        //this.midiPlayer.play('C4')
    })

    this.store.dispatch(new SVActions.MidiPlayerLoadStart())
    this.midiCommandGiver = new Player()
  }

  setList(notelist)
  {
    this.originalNoteList = notelist.reverse()
  }

  loadScore(midiScore)
  {
    let binary_string = window.atob(midiScore)
    let len = binary_string.length
    let bytes = new Uint8Array(len)
    for(let i = 0; i < len; i++)
    {
      bytes[i] = binary_string.charCodeAt(i)
    }

    let arrayBuffer = bytes.buffer;

    this.midiCommandGiver.loadArrayBuffer(arrayBuffer)

    this.midiCommandGiver.play()

    this.loadedScoreMidiNotes = this.midiCommandGiver.getEvents()
  }

  public startPlaying()
  {
    this.midiNotes = Object.assign([], this.loadedScoreMidiNotes[1])
    this.midiNotes = this.midiNotes.reverse()

    this.noteList = Object.assign([], this.originalNoteList)

    for(let i = 0; i < this.midiNotes.length; i++)
    {
      if((this.midiNotes[i].name == "Note on" && this.midiNotes[i].velocity <= 0))
      {
        console.log('Deleting' + this.midiNotes[i].name)
        this.midiNotes.splice(i, 1)
      }
    }

    setTimeout(()=>{this.play();}, (this.tickTime * (this.midiNotes[0].tick - this.midiNotes[1].tick)) * 1000)
  }

  play()
  {
    let midiNoteToPlay = this.midiNotes[this.midiNotes.length - 1]
    console.log(midiNoteToPlay)
    let timeout = 0;
    if(midiNoteToPlay.name == "Note on")
    {
      this.midiPlayer.play(midiNoteToPlay.noteName)
      timeout = (this.tickTime * (this.midiNotes[this.midiNotes.length -2].tick - this.midiNotes[this.midiNotes.length -1].tick)) * 1000
        if(this.highlited)
        {  
          this.unhighlightNote(this.noteList.length -1)
          this.unhighlightNote(this.noteList.length -2)
          this.noteList.pop()
          this.noteList.pop()
          this.highlightNote(this.noteList.length - 1)
          this.highlightNote(this.noteList.length -2)
        }
        else
        {
          this.highlightNote(this.noteList.length - 1)
          this.highlightNote(this.noteList.length - 2)
          this.highlited = true
        }
      
        this.midiNotes.pop()
        setTimeout(()=>{this.play();}, timeout)
    }
    else if(midiNoteToPlay.name == "End of Track")
    {
      console.log('Stopping...')
      clearInterval(this.timer)
      this.unhighlightNote(this.noteList.length -1)
      this.unhighlightNote(this.noteList.length -2)
      this.midiNotes = []
      this.highlited = false  
      setTimeout(()=>{this.play();}, timeout)
    }
    else
    {
      this.midiNotes.pop()
      setTimeout(()=>{this.play();}, timeout)
    }
    
  }

  unhighlightNote(index)
  {
    this.renderer.setAttribute(this.noteList[index], "fill", "#000");
  }

  highlightNote(index)
  {
    this.renderer.setAttribute(this.noteList[index], "fill", "#7DE2DB");
  }

  setRender(renderer)
  {
    this.renderer = renderer
  }
}
