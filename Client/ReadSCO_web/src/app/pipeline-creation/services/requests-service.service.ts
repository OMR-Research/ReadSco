import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServicesModel } from '../store/model/services-model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  getServices$()
  {
    let url = environment.apiEndpoint + "/services";
    return this.httpClient.get<ServicesModel>(url, httpOptions);
  }

  constructor(private httpClient : HttpClient)
    {
    }


}
