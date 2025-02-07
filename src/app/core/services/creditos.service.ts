import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../app-config/app-settings-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  constructor(
      private _http: HttpClient,
      private appSettings: AppSettingsService
  ) { }

    getCreditos(param): Observable<any> {
        return this._http.get(`${this.appSettings.creditos.url.base}/${param}`)
    }

    getCreditosCard(): Observable<any> {
        return this._http.get(`${this.appSettings.creditos.url.base}/TrabajadorCard`)
    }

    getCredito(id): Observable<any> {
        return this._http.get(`${this.appSettings.creditos.url.base}/${id}`)
    }

    putCredito(data): Observable<any> {
      const id = data.id;
      delete data.id;
      return this._http.put(`${this.appSettings.creditos.url.base}/${id}`, data)
    }
}
