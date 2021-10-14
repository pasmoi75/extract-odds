import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResultInterface} from '../interfaces/result.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getUniData(): Observable<ResultInterface> {
    return this.http.get<ResultInterface>('assets/result.txt');
  }

}
