export type ActiveTab = 'rfm-dashboard' | 'patient-segments' | 'recall-campaigns' | 'treatment-retention';

export type PatientTier = 'Diamond VIP' | 'VVIP Black' | 'Gold Tier' | 'Silver Tier' | 'Regular' | 'Doctor Colleague';

export type RiskStatus = 'urgent' | 'warning' | 'normal' | 'booked';

export interface Patient {
  id: string;
  hn: string;
  name: string;
  age: number;
  gender: 'หญิง' | 'ชาย';
  phone: string;
  tier: PatientTier;
  rfmSegment: string;
  rScore: number;
  fScore: number;
  mScore: number;
  recencyDays: number;
  lastVisitDate: string;
  monetary: number;
  visitsPerYear: number;
  primaryProcedure: string;
  doctor: string;
  avatarUrl?: string;
  initials: string;
  riskStatus: RiskStatus;
  riskLabel: string;
  treatmentNotes?: string;
  expiringCourse?: {
    name: string;
    remaining: number;
    total: number;
    expiryDate: string;
    isExpiringSoon?: boolean;
  };
  lastContactStatus?: string;
}

export interface OutreachQueueItem {
  id: string;
  patientId: string;
  name: string;
  tier: string;
  rfmString: string;
  procedure: string;
  daysAgo: number;
  phone: string;
  avatarUrl?: string;
  initials?: string;
  status: 'pending' | 'line' | 'booked' | 'declined';
  suggestedScript: string;
  badgeLabel: string;
  badgeType: 'urgent' | 'line' | 'booked' | 'warning';
  completedNote?: string;
  loggedBy?: string;
  scheduledDate?: string;
  courseDetails?: string;
}

export interface ProcedureLifecycle {
  id: string;
  code: string;
  name: string;
  brands: string;
  avgCycleMonths: string;
  repeatRate: string;
  avgLtv: string;
  firstOptimalMonth: string;
  peakOrRecallMonth: string;
  driftRiskMonth: string;
  optimalPercent: number;
  recallPercent: number;
  driftPercent: number;
  note?: string;
}

export interface CohortRow {
  month: string;
  newPatients: number;
  m0: string;
  m1: string;
  m2: string;
  m3: string;
  m4: string;
  m5: string;
  m6: string;
  m8: string;
  m10: string;
  m12: string;
  note?: string;
}
