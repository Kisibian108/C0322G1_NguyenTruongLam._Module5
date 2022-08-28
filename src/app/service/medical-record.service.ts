import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalRecord} from "../model/medical-record";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {

  // private URL_MEDICAL = "http://localhost:8080/medicalRecord";

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(API_URL + `/list?page=${page}`);
  }

  // getAll(page: number): Observable<MedicalRecord[]> {
  //   return this.http.get<MedicalRecord[]>(this.URL_MEDICAL + '/list?page=${page}');
  // }

  save(medicalRecord: any): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(API_URL + '/create', medicalRecord);
  }

  findById(id: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${API_URL}/findById/${id}`);
  }

  update(id: number, medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${API_URL}/update/${id}`, medicalRecord);
  }

  delete(id: number): Observable<MedicalRecord> {
    return this.http.delete<MedicalRecord>(`${API_URL}/${id}`);
  }

  // search(name: string | undefined, doctor: string): Observable<MedicalRecord>{
  //   return this.http.get<MedicalRecord>(API_URL + '/list' + "?name_like=" + name + "&doctor_like=" + doctor)
  // }

  search(name: string, doctor: string): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>
    (`${API_URL}/tickets/search/${name}&${doctor}`);
  }
}
