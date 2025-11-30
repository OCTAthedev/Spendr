export enum View {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ENTERPRISE = 'ENTERPRISE',
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  flag?: string;
}

export interface Friend {
  id: string;
  name: string;
  spent: number;
  status: string; // e.g., "Eviction Imminent"
  rank: number;
  avatar: string;
}

export interface UserProfile {
  name: string;
  height: string;
  background: string;
  riskTolerance: string;
}