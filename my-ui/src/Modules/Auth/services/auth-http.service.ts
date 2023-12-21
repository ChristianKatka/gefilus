import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(
    protected http: HttpClient,
    protected cognitoService: CognitoService
  ) {}
  public get<T>(url: string): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      concatMap((httpOptions) => this.http.get(url, httpOptions))
    );
  }

  public delete<T>(url: string): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      concatMap((httpOptions) => this.http.delete(url, httpOptions))
    );
  }

  public post<T>(url: string, body: any): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      concatMap((httpOptions) => this.http.post(url, body, httpOptions))
    );
  }

  public postFile<T>(url: string, body: any): Observable<any> {
    return this.getHttpOptionsForFile().pipe(
      concatMap((httpOptions) => this.http.post(url, body, httpOptions))
    );
  }

  public put<T>(url: string, body: any): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      concatMap((httpOptions) => this.http.put(url, body, httpOptions))
    );
  }

  public putFile<T>(url: string, body: any): Observable<any> {
    return this.getHttpOptionsForFile().pipe(
      concatMap((httpOptions) => this.http.put(url, body, httpOptions))
    );
  }

  protected getHttpOptions(contentType: string): Observable<any> {
    return this.getAuthHttpHeaders(contentType).pipe(
      map((authHttpHeaders) => ({
        headers: authHttpHeaders,
      }))
    );
  }

  protected getHttpOptionsForFile(): Observable<any> {
    return this.getAuthHttpHeadersForFile().pipe(
      map((authHttpHeaders) => ({
        headers: authHttpHeaders,
      }))
    );
  }

  protected getAuthHttpHeaders(contentType: string): Observable<any> {
    return this.cognitoService.getIdentityToken().pipe(
      map(
        (jwtToken) =>
          new HttpHeaders({
            'Content-Type': contentType,
            Authorization: jwtToken,
          })
      )
    );
  }

  protected getAuthHttpHeadersForFile(): Observable<any> {
    return this.cognitoService.getIdentityToken().pipe(
      map(
        (jwtToken) =>
          new HttpHeaders({
            Authorization: jwtToken,
          })
      )
    );
  }
}
