import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotesService {
  BaseUrl: string = 'https://routeegypt.herokuapp.com/';
  constructor(public _Httpclient: HttpClient) {}
  getUserNotes(Data: any): Observable<any> {
    return this._Httpclient.post(
      'https://routeegypt.herokuapp.com/getUserNotes',
      Data
    );
  }
  editNotes(userNote: object): Observable<any> {
    return this._Httpclient.post(this.BaseUrl + 'addNote', userNote);
  }
  deleteNote(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({}),
      body: {
        NoteID: id.NoteID,
        token: id.token,
      },
    };
    return this._Httpclient.delete(
      'https://routeegypt.herokuapp.com/deleteNote',
      httpOptions
    );
  }
  upDateNote(data: any): Observable<any> {
    return this._Httpclient.put(
      'https://routeegypt.herokuapp.com/updateNote',
      data
    );
  }
}
