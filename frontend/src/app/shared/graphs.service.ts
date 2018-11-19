import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Graphs } from '../graphs';

@Injectable({
  providedIn: 'root'
})

export class GraphsService {
  private URL  = "http://localhost:3000/graficos";
  graphs:Graphs;

  constructor(private http: HttpClient) { }

  createGraph(){
    return this.http.get(this.URL);
  }
}