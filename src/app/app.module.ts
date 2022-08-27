import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import {RouterModule, Routes} from "@angular/router";
import { MedicalRecordCreateComponent } from './medical-record-create/medical-record-create.component';
import { MedicalRecordEditComponent } from './medical-record-edit/medical-record-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'medical'},
  {path: 'medical', component: MedicalRecordComponent },
  {path: 'medical-create', component: MedicalRecordCreateComponent },
  {path: 'medical-edit/:id', component: MedicalRecordEditComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    MedicalRecordComponent,
    MedicalRecordCreateComponent,
    MedicalRecordEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
