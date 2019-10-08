import { Injectable } from '@angular/core';

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

  midiNotes: any[] = []

  constructor(private store : Store<fromApp.AppState>) 
  { 
    this.storeSubscription = this.store.select('scoreVisualization').subscribe(loadState => {
      if(loadState.midiPlayer != null)
      {
        this.midiPlayer = loadState.midiPlayer;
        console.log('Ready to play!!')
      }
        //this.midiPlayer.play('C4')
    })

    this.store.dispatch(new SVActions.MidiPlayerLoadStart())
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

    this.midiCommandGiver = new Player()

    this.midiCommandGiver.loadArrayBuffer(arrayBuffer)

    this.midiCommandGiver.play()

    this.midiNotes = this.midiCommandGiver.getEvents()
  }

  public startPlaying()
  {
    this.midiNotes = this.midiNotes[1].reverse()
    for(let i = 0; i < this.midiNotes.length; i++)
    {
      if(this.midiNotes[i].name == "Note on" && this.midiNotes[i].velocity <= 0)
      {
        console.log('Deleting')
        this.midiNotes.splice(i, 1)
      }
    }
    this.timer = setInterval(()=>{this.play();}, 0.8 * 1000)
  }

  play()
  {
    console.log('Playing...')
    let midiNoteToPlay = this.midiNotes[this.midiNotes.length - 1]
    console.log(midiNoteToPlay)
    if(midiNoteToPlay.name == "Note on")
    {
      this.midiPlayer.play(midiNoteToPlay.noteName)
      this.midiNotes.pop()
    }
    else if(midiNoteToPlay.name == "End of Track")
    {
      console.log('Stopping...')
      clearInterval(this.timer)
      this.midiNotes = []  
    }
    else
      this.midiNotes.pop()
  }
}
