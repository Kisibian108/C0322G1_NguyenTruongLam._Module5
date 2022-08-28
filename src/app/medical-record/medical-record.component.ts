import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {MedicalRecord} from "../model/medical-record";
import {Patient} from "../model/patient";
import {MedicalRecordService} from "../service/medical-record.service";
import {PatientService} from "../service/patient.service";
import {FormControl, FormGroup} from "@angular/forms";

// const API_URL = `${environment.apiUrl}`;
const URL_MEDICAL = "http://localhost:8080/medicalRecord";

@Component({
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrls: ['./medical-record.component.css']
})
export class MedicalRecordComponent implements OnInit {

  medicalRecords: any[] = [];
  patient: Patient[];
  idDelete: number = 0;
  name: string | undefined = '';
  doctor: string
  p: number = 0
  searchForm: FormGroup
  number: number
  totalPages: number
  countTotalPages: number[]

  constructor(
    private medicalRecordService: MedicalRecordService,
    private patientService: PatientService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getAll(0);
  }

  getAll(page: number) {
    this.medicalRecordService.getAll(page).subscribe((data: MedicalRecord[]) => {
      // @ts-ignore
      this.totalPages = data.totalPages;
      // @ts-ignore
      this.countTotalPages = new Array(data.totalPages)
      // @ts-ignore
      this.number = data.number;
      // @ts-ignore
      this.medicalRecords = data.content;
    }, error => {
      console.log(error);
    });
  }

  showDelete(medicalRecord: MedicalRecord) {
    this.idDelete = medicalRecord.id || 0;
    this.name = medicalRecord.patient.name
  }

  delete(id: number) {
    this.medicalRecordService.delete(id).subscribe(() => {
      this.router.navigate(['/medical']).then(r => this.ngOnInit());
    }, e => {
      console.log(e);
    });
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      nameSearch: new FormControl(),
      doctorSearch: new FormControl(),
    })
  }

  // searchMedical(): void {
  //   // @ts-ignore
  //   this.medicalRecordService.search(this.searchForm.value).subscribe((value: MedicalRecord[]) => {
  //     // @ts-ignore
  //     this.medicalRecords = value.content;
  //   })
  // }

  // search(): void {
  //   this.medicalRecordService.search(this.name, this.doctor).subscribe(medicalRecords => {
  //     this.medicalRecords = medicalRecords;
  //   });
  // }


  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAll(numberPage);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAll(numberPage);
    }
  }

  goItem(i: number) {
    this.getAll(i);
  }
}
