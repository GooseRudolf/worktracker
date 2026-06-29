export type VacancyStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
export type vacancyType = { id?: number; user?: number; company: string; position: string; 
    status: VacancyStatus; salary?: number | null; url?: string; applied_at?: string | null; 
    notes?: string; created_at?: string; updated_at?: string }
export const vacancyInit: vacancyType = { company: "", position: "", status: "saved", salary: null, url: "", applied_at: null, notes: "", created_at: "", updated_at: "" }

// dashboard
export type DashboardStats = { total: number; active: number; interview: number; offer: number, latest:vacancyType[];} 
export const dashboardInit: DashboardStats = { total: 0, active: 0, interview: 0, offer: 0, latest:[] }