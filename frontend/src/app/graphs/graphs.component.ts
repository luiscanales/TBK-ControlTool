import { Component, OnInit } from '@angular/core';
import {GraphsService} from '../shared/graphs.service';
import {Graphs} from '../graphs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  private datos:Graphs;
  constructor(private _graphsService:GraphsService) { }

  ngOnInit() {
  }
  
}
