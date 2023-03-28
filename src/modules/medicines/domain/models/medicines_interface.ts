import { IMedications } from '@modules/medications/domain/medications_interface'

export interface IMedicines {
  id: string
  registryNumber: string
  sideEffects?: string
  medication: IMedications
  created_at: Date
  updated_at: Date
}
