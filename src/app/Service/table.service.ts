import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { table } from '../Models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getTables() : Observable<table> {
    return this.http.get<table>(`${this.baseUrl}`)
  }

  getTableById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  deleteTable(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  addTable (data:table):Observable<table>{
    return this.http.post<table>(`${this.baseUrl}/`,data)
  }

  editTable = (id:string,data:table)=>{
    return this.http.put(`${this.baseUrl}/${id}`,data)
  }

}
