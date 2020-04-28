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
  private data = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-model href="http://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
  <?xml-model href="http://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>
  <mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="4.0.0">
      <meiHead>
          <fileDesc>
              <titleStmt>
                  <title />
              </titleStmt>
              <pubStmt></pubStmt>
          </fileDesc>
          <encodingDesc xml:id="encodingdesc-0000000483705616">
              <appInfo xml:id="appinfo-0000000954600937">
                  <application xml:id="application-0000000516408066" isodate="2019-10-16T11:04:50" version="2.2.0-dev-c01b3a1-dirty">
                      <name xml:id="name-0000001565976375">Verovio</name>
                      <p xml:id="p-0000002033421552">Transcoded from MusicXML</p>
                  </application>
              </appInfo>
          </encodingDesc>
      </meiHead>
      <music>
          <body>
              <mdiv xml:id="mdiv-0000000258697523">
                  <score xml:id="score-0000001068445805">
                      <scoreDef xml:id="scoredef-0000000212692447">
                          <staffGrp xml:id="staffgrp-0000000461570263">
                              <staffDef xml:id="staffdef-0000001109369232" clef.shape="G" clef.line="2" key.sig="3f" meter.count="4" meter.unit="4" n="1" lines="5" ppq="4">
                                  <label xml:id="label-0000000013141360">Piano</label>
                                  <labelAbbr xml:id="labelAbbr-0000000525470744">Pno.</labelAbbr>
                                  <instrDef xml:id="instrdef-0000001064498341" midi.channel="0" midi.instrnum="0" midi.volume="78.00%" />
                              </staffDef>
                          </staffGrp>
                      </scoreDef>
                      <section xml:id="section-0000000198333416">
                          <pb xml:id="pb-0000001382618954" />
                          <measure xml:id="measure-0000001176802196" n="1">
                              <staff xml:id="staff-0000001333247678" n="1">
                                  <layer xml:id="layer-0000000990621766" n="1">
                                      <beam xml:id="beam-0000001343775295">
                                          <note xml:id="note-0000002047724118" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000411911986" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001736975002" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000000086801448">
                                          <note xml:id="note-0000000165066491" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000870426884" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000155416348">
                                          <note xml:id="note-0000002103191733" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000001848895564" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000561508231" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001834502647">
                                          <note xml:id="note-0000002129683303" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000000649611284" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001642061961" n="2">
                              <staff xml:id="staff-0000000544550169" n="1">
                                  <layer xml:id="layer-0000001368302902" n="1">
                                      <beam xml:id="beam-0000001734430767">
                                          <note xml:id="note-0000000256516798" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000000709680415" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001914540064" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001108558789">
                                          <note xml:id="note-0000001548115403" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001060741822" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <note xml:id="note-0000001650467103" dur.ppq="4" dur="4" oct="5" pname="d" stem.dir="down" />
                                      <rest xml:id="rest-0000000798140354" dur.ppq="2" dur="8" />
                                      <beam xml:id="beam-0000000685716764">
                                          <note xml:id="note-0000000659051703" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000634374589" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000472846441" n="3">
                              <staff xml:id="staff-0000000173606978" n="1">
                                  <layer xml:id="layer-0000000366063818" n="1">
                                      <beam xml:id="beam-0000001799608021">
                                          <note xml:id="note-0000000130930945" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001060607909" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000000600987922" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000120699423">
                                          <note xml:id="note-0000001462905560" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001966998134" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001849988019">
                                          <note xml:id="note-0000001382503315" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000061297771" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000684204291" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001176653904">
                                          <note xml:id="note-0000001202382292" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000000670988715" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000366761743" n="4">
                              <staff xml:id="staff-0000000999928909" n="1">
                                  <layer xml:id="layer-0000001198507082" n="1">
                                      <beam xml:id="beam-0000001890335068">
                                          <note xml:id="note-0000000181955129" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000905081717" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000307938811" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001479344018">
                                          <note xml:id="note-0000000002568279" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001160541353" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <note xml:id="note-0000000810563703" dur.ppq="4" dur="4" oct="5" pname="d" stem.dir="down" />
                                      <rest xml:id="rest-0000000184321937" dur.ppq="2" dur="8" />
                                      <beam xml:id="beam-0000000456819182">
                                          <note xml:id="note-0000000188486603" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001265486157" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <sb xml:id="sb-0000000533477899" />
                          <measure xml:id="measure-0000001871208789" n="5">
                              <staff xml:id="staff-0000000472113578" n="1">
                                  <layer xml:id="layer-0000001743278534" n="1">
                                      <beam xml:id="beam-0000001107257184">
                                          <note xml:id="note-0000001216683468" dur.ppq="2" dur="8" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000000030439440" dur.ppq="1" dur="16" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000002082857648" dur.ppq="1" dur="16" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001335550031">
                                          <note xml:id="note-0000001301235086" dur.ppq="2" dur="8" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000000882479708" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="up" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000002054782297">
                                          <note xml:id="note-0000002069222483" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000000097126846" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001897252935" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000679559066">
                                          <note xml:id="note-0000001303841418" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000001986781229" dur.ppq="2" dur="8" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000932220682" n="6">
                              <staff xml:id="staff-0000000358677420" n="1">
                                  <layer xml:id="layer-0000000910542614" n="1">
                                      <beam xml:id="beam-0000000618836594">
                                          <note xml:id="note-0000001365491113" dur.ppq="2" dur="8" oct="4" pname="g" stem.dir="up" />
                                          <note xml:id="note-0000001865281858" dur.ppq="1" dur="16" oct="4" pname="g" stem.dir="up" />
                                          <note xml:id="note-0000000403508765" dur.ppq="1" dur="16" oct="4" pname="g" stem.dir="up" />
                                      </beam>
                                      <beam xml:id="beam-0000001002436780">
                                          <note xml:id="note-0000000065788101" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000002085667205" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                      <note xml:id="note-0000000948767674" dur.ppq="4" dur="4" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      <note xml:id="note-0000001355012464" dur.ppq="4" dur="4" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000227487096" n="7">
                              <staff xml:id="staff-0000000178116583" n="1">
                                  <layer xml:id="layer-0000001752120426" n="1">
                                      <beam xml:id="beam-0000000280968082">
                                          <note xml:id="note-0000001984190922" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000348709453" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001570038906" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001573569478">
                                          <note xml:id="note-0000000442463594" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000149548778" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000056289845">
                                          <note xml:id="note-0000001493814783" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down">
                                              <accid xml:id="accid-0000000106329231" accid="f" accid.ges="f" />
                                          </note>
                                          <note xml:id="note-0000000748338531" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001736439065" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000000297946762">
                                          <note xml:id="note-0000001745779619" dur.ppq="2" dur="8" oct="5" pname="a" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001328038102" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001699172990" n="8">
                              <staff xml:id="staff-0000000946431701" n="1">
                                  <layer xml:id="layer-0000001867299849" n="1">
                                      <beam xml:id="beam-0000001446158924">
                                          <note xml:id="note-0000001564579331" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000000197273694" dur.ppq="1" dur="16" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000000824675619" dur.ppq="1" dur="16" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000308291692">
                                          <note xml:id="note-0000000922086647" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000001199800015" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down">
                                              <accid xml:id="accid-0000000060073645" accid="f" accid.ges="f" />
                                          </note>
                                      </beam>
                                      <note xml:id="note-0000000633194342" dots="1" dur.ppq="6" dur="4" oct="5" pname="f" stem.dir="down" />
                                      <beam xml:id="beam-0000000810372199">
                                          <note xml:id="note-0000000405695114" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down">
                                              <accid xml:id="accid-0000000894171949" accid="n" />
                                          </note>
                                          <note xml:id="note-0000000302936004" dur.ppq="1" dur="16" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <sb xml:id="sb-0000001065357101" />
                          <measure xml:id="measure-0000000972799520" n="9">
                              <staff xml:id="staff-0000000389502082" n="1">
                                  <layer xml:id="layer-0000000924030941" n="1">
                                      <beam xml:id="beam-0000001002367391">
                                          <note xml:id="note-0000001395226534" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000877416144" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001005442907" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001671927916">
                                          <note xml:id="note-0000002044857360" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000118290376" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000844564526">
                                          <note xml:id="note-0000000705262348" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000001705302573" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000878814737" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001569697093">
                                          <note xml:id="note-0000000262298401" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000002008785624" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001384235020" n="10">
                              <staff xml:id="staff-0000000482128636" n="1">
                                  <layer xml:id="layer-0000001781304025" n="1">
                                      <beam xml:id="beam-0000001234890144">
                                          <note xml:id="note-0000000655344803" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000000394131216" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000000927137774" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001647012098">
                                          <note xml:id="note-0000001217345101" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001994510268" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <note xml:id="note-0000001973807253" dur.ppq="4" dur="4" oct="5" pname="d" stem.dir="down" />
                                      <rest xml:id="rest-0000000069811146" dur.ppq="2" dur="8" />
                                      <beam xml:id="beam-0000001199919399">
                                          <note xml:id="note-0000001791191242" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001562802337" dur.ppq="1" dur="16" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001285258542" n="11">
                              <staff xml:id="staff-0000000434464990" n="1">
                                  <layer xml:id="layer-0000001868120658" n="1">
                                      <beam xml:id="beam-0000000141351721">
                                          <note xml:id="note-0000000295689047" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000000331538640" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000002133308746" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001367138608">
                                          <note xml:id="note-0000000894361229" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001137776137" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001511932325">
                                          <note xml:id="note-0000001483303560" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000965989927" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000001721041481" dur.ppq="1" dur="16" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001868991896">
                                          <note xml:id="note-0000001470813117" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001816843602" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001836356257" n="12">
                              <staff xml:id="staff-0000001330116299" n="1">
                                  <layer xml:id="layer-0000001095217557" n="1">
                                      <beam xml:id="beam-0000002037181673">
                                          <note xml:id="note-0000000875955277" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000907082628" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000000609287570" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001919069498">
                                          <note xml:id="note-0000000433756605" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                          <note xml:id="note-0000002004667636" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <note xml:id="note-0000000609636269" dur.ppq="4" dur="4" oct="5" pname="d" stem.dir="down" />
                                      <rest xml:id="rest-0000000714781896" dur.ppq="2" dur="8" />
                                      <beam xml:id="beam-0000000630745432">
                                          <note xml:id="note-0000000715873923" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001224070072" dur.ppq="1" dur="16" oct="4" pname="b" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <sb xml:id="sb-0000000832626286" />
                          <measure xml:id="measure-0000000135194452" n="13">
                              <staff xml:id="staff-0000000918051130" n="1">
                                  <layer xml:id="layer-0000000325766762" n="1">
                                      <beam xml:id="beam-0000000246050575">
                                          <note xml:id="note-0000001313666717" dur.ppq="2" dur="8" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000000671347668" dur.ppq="1" dur="16" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000000063935797" dur.ppq="1" dur="16" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000001905244768">
                                          <note xml:id="note-0000000839238423" dur.ppq="2" dur="8" oct="4" pname="a" stem.dir="up" accid.ges="f" />
                                          <note xml:id="note-0000000712320887" dur.ppq="2" dur="8" oct="4" pname="b" stem.dir="up" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000000290770432">
                                          <note xml:id="note-0000000643927762" dur.ppq="2" dur="8" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001799398575" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                          <note xml:id="note-0000001565213167" dur.ppq="1" dur="16" oct="5" pname="c" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000873197542">
                                          <note xml:id="note-0000001547460509" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000000559362888" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000296217857" n="14">
                              <staff xml:id="staff-0000001513446834" n="1">
                                  <layer xml:id="layer-0000000334196882" n="1">
                                      <beam xml:id="beam-0000000295987273">
                                          <note xml:id="note-0000000390132045" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000025654038" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000001186955508" dur.ppq="1" dur="16" oct="5" pname="g" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000000940809976">
                                          <note xml:id="note-0000000915000869" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000891949325" dur.ppq="2" dur="8" oct="5" pname="b" stem.dir="down" accid.ges="f" />
                                      </beam>
                                      <beam xml:id="beam-0000002012089665">
                                          <note xml:id="note-0000000698648863" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000041546037" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000707255353" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000001744803569" dur.ppq="2" dur="8" oct="5" pname="e" stem.dir="down" accid.ges="f" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000000210899868" n="15">
                              <staff xml:id="staff-0000000062286846" n="1">
                                  <layer xml:id="layer-0000000757341007" n="1">
                                      <beam xml:id="beam-0000000421496160">
                                          <note xml:id="note-0000001677133087" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001520710132" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000002005860837" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000731858385" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                      </beam>
                                      <beam xml:id="beam-0000001567804217">
                                          <note xml:id="note-0000000292266006" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000001452688536" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000001225043390" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000002120476036" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                      </beam>
                                  </layer>
                              </staff>
                          </measure>
                          <measure xml:id="measure-0000001716629013" right="end" n="16">
                              <staff xml:id="staff-0000000947075228" n="1">
                                  <layer xml:id="layer-0000001221258256" n="1">
                                      <beam xml:id="beam-0000000565269886">
                                          <note xml:id="note-0000000141215375" dur.ppq="2" dur="8" oct="5" pname="d" stem.dir="down" />
                                          <note xml:id="note-0000001046136217" dur.ppq="2" dur="8" oct="5" pname="f" stem.dir="down" />
                                          <note xml:id="note-0000000596236919" dur.ppq="2" dur="8" oct="5" pname="g" stem.dir="down" />
                                          <note xml:id="note-0000000095831160" dur.ppq="2" dur="8" oct="6" pname="c" stem.dir="down" />
                                      </beam>
                                      <note xml:id="note-0000000387507269" dur.ppq="4" dur="4" oct="5" pname="b" stem.dir="down">
                                          <accid xml:id="accid-0000001189517506" accid="n" />
                                      </note>
                                      <note xml:id="note-0000001001210522" dur.ppq="4" dur="4" oct="5" pname="g" stem.dir="down" />
                                  </layer>
                              </staff>
                          </measure>
                      </section>
                  </score>
              </mdiv>
          </body>
      </music>
  </mei>
  `;
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
            this.renderedSVG = this.verovioService.renderScore(this.data)
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
