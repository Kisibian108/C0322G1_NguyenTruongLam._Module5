import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MedicalRecord} from "../model/medical-record";
import {Patient} from "../model/patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private URL_PATIENT = "http://localhost:8080/patient";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.URL_PATIENT + '/list');
  }
}
