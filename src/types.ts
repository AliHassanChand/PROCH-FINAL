export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  experience: string;
  philosophy: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  approach: string;
  methodology: string[];
  outcomes: string[];
  cqcAlignment: string;
}

export interface PropertyFeature {
  id: string;
  title: string;
  description: string;
  details: string[];
  category: 'bedroom' | 'outdoor' | 'sensory' | 'communal' | 'safety';
}

export interface CareerOpportunity {
  id: string;
  title: string;
  type: string;
  salary: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ReferralSubmission {
  clientName: string;
  clientDoB: string;
  primaryDiagnosis: string;
  scoutingAuthority: string;
  fundedBy: string;
  fundingSecured: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  hasRiskLog: boolean;
  notes: string;
}
