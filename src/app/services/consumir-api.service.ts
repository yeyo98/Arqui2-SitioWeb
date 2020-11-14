import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ipApp } from '../models/host';

@Injectable({
  providedIn: 'root'
})
export class ConsumirApiService {

  API_URI = ipApp;

  constructor(private http: HttpClient) { }

  getMediumTemperature(){
    return this.http.get(`${this.API_URI}/getPorcentaje`)
  }

  getTraficoPersona(){
    return this.http.get(`${this.API_URI}/getBarra`)
  }
}
