export type VacancyStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
export type vacancyType = { id?: number; user?: number; company: string; position: string; 
    status: VacancyStatus; salary?: number | null; url?: string; applied_at?: string | null; 
    notes?: string; created_at?: string; updated_at?: string }