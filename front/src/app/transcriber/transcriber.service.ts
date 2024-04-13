import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranscriberService {

  constructor(private http: HttpClient) { }

  transcribe(url:any):Observable<any>{
    return this.http.post(environment.apiUrl + 'transcribe_video/', url);
  }


}
