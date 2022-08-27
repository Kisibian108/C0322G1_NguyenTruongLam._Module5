import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Patient} from "../model/patient";
import {MedicalRecordService} from "../service/medical-record.service";
import {PatientService} from "../service/patient.service";

@Component({
  selector: 'app-medical-record-edit',
  templateUrl: './medical-record-edit.component.html',
  styleUrls: ['./medical-record-edit.component.css']
})
export class MedicalRecordEditComponent implements OnInit {

  medicalForm: FormGroup
  patients: Patient[] = []
  id: number = 0;

  constructor(private medicalRecordService: MedicalRecordService,
              private patientService: PatientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getDanhSach(this.id);
    });
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.patientService.getAll().subscribe(patients => {
      this.patients = patients
    });
  }

  getDanhSach(id: number) {
    return this.medicalRecordService.findById(id).subscribe(medical => {
      this.medicalForm = new FormGroup({
        id: new FormControl(medical.id),
        medical: new FormControl(medical.medical, [Validators.required]),
        patient: new FormControl(medical.patient.name, [Validators.required]),
        name: new FormControl(medical.name, [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
        startDate: new FormControl(medical.startDate, [Validators.required, this.validate]),
        endDate: new FormControl(medical.endDate, [Validators.required]),
        reason: new FormControl(medical.reason, [Validators.required]),
        medthod: new FormControl(medical.medthod, [Validators.required]),
        doctor: new FormControl(medical.doctor, [Validators.required]),
      });
      console.log(
        medical
      )
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

  update(id: number) {
    // @ts-ignore
    const medical = this.medicalForm.value;
    this.medicalRecordService.update(id, medical).subscribe(() => {
      this.toastrService.success("cap nhat thanh cong")
      // alert('Cập nhật thành công');
      this.router.navigate(['/danhsach'])
    }, e => {
      console.log(e);
    });
  }
}
