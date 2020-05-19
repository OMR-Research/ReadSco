import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Store } from '@ngrx/store';
import { PipelineCreationState } from '../store/pipelinecreation.reducer';
import { Subscription } from 'rxjs';
import { selectServices } from '../store/pipelinecreation.selector';
import { StartServicesRequest } from '../store/pipelinecreation.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  public graph: joint.dia.Graph;
  servicesNames:string[];
  servicesSubscription: Subscription;

  constructor(private pipelineStore: Store<PipelineCreationState>) 
  { 

  }

  ngOnInit() 
  {
    this.servicesNames = []
    this.pipelineStore.dispatch(new StartServicesRequest());

    this.servicesSubscription = this.pipelineStore.select(selectServices).subscribe((services:string[])=>{
        if(services!=null)
        {
            services.forEach(service=>{
                if(service!="translationhub")
                    this.servicesNames.push(service.toUpperCase());
            })
        }
    })

    this.graph = new joint.dia.Graph;
    new joint.dia.Paper({ el: jQuery('#paper'), width: 1920, height: 1080, gridSize: 1, model: this.graph });

    //this.addNewCellToGraph('LayoutAnalysis', 500, 125);

    this.graph.on('change:source change:target', function(link) {
        var sourcePort = link.get('source').port;
        var sourceId = link.get('source').id;
        var targetPort = link.get('target').port;
        var targetId = link.get('target').id;

        var m = [
            'The port <b>' + sourcePort,
            '</b> of element with ID <b>' + sourceId,
            '</b> is connected to port <b>' + targetPort,
            '</b> of elemnt with ID <b>' + targetId + '</b>'
        ].join('');

        console.log(m);
    });
  }

  public createNewCell(name: string)
  {
      console.log(name)
      const x = Math.floor(Math.random() * (1000 - 500 + 1) + 500);
      const y = Math.floor(Math.random() * (400 - 125 + 1) + 125);
      this.addNewCellToGraph(name, x, y);
  }

  addNewCellToGraph(cellName:string, x:number, y:number)
  {
    const m1 = new joint.shapes.devs.Model({
      position: { x: x, y: y },
      size: { width: 150, height: 100 },
      inPorts: ['in'],
      outPorts: ['out'],
      ports: {
          groups: {
              'in': {
                  attrs: {
                      '.port-body': {
                          fill: '#16A085'
                      }
                  }
              },
              'out': {
                  attrs: {
                      '.port-body': {
                          fill: '#E74C3C'
                      }
                  }
              }
          }
      },
      attrs: {
          '.label': { text: cellName, 'ref-x': .5, 'ref-y': .2 },
          rect: { fill: '#9bf6ff' }
      }
    });
    
    this.graph.addCell(m1);
  }

  ngAfterViewInit(): void {
  }

}
