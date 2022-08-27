import {Patient} from "./patient";

export interface MedicalRecord {
  id?: number
  medical?: string
  patient: Patient
  name?: string
  startDate?: string
  endDate?: string
  reason?: string
  medthod?: string
  doctor?: string
}
