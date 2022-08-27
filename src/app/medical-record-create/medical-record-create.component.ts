import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Patient} from "../model/patient";
import {MedicalRecordService} from "../service/medical-record.service";
import {PatientService} from "../service/patient.service";

@Component({
  selector: 'app-medical-record-create',
  templateUrl: './medical-record-create.component.html',
  styleUrls: ['./medical-record-create.component.css']
})
export class MedicalRecordCreateComponent implements OnInit {

  patients: Patient[] = []

  medicalForm = new FormGroup({
    id: new FormControl(''),
    medical: new FormControl('',[Validators.required]),
    patient: new FormControl('',[Validators.required]),
    name: new FormControl( '',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    startDate: new FormControl('',[Validators.required, this.validate]),
    endDate: new FormControl('',[Validators.required]),
    reason: new FormControl('',[Validators.required]),
    medthod: new FormControl('',[Validators.required]),
    doctor: new FormControl( '',[Validators.required]),
  });

  submit() {
    const medical = this.medicalForm.value;
    this.medicalRecordService.save(medical).subscribe(() => {
      this.medicalForm.reset();
      // alert("them moi thanh cong")
      this.toastrService.success("Them moi thanh cong")
      this.router.navigate(['medical'])
    }, e => {
      console.log(e);
    });
  }

  constructor(private medicalRecordService: MedicalRecordService,
              private patientService: PatientService,
              private router: Router,
              private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.patientService.getAll().subscribe(patients => {
      this.patients = patients
    });
  }

  validate(dob: AbstractControl) {
    const startDate = new Date();
    const endDate = new Date(dob.value);
    const diff = startDate.getDate() - endDate.getDate();
    if (diff <= 0) {
      return {'Error': true};
    }
    return null;
  }
}
