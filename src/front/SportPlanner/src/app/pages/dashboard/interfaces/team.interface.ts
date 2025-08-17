export interface Team {
  id: string;
  name: string;
  sport: SportType;
  category: string;
  description?: string;
  color: string;
  playersCount: number;
  coachId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SportType = 
  | 'football' 
  | 'basketball' 
  | 'volleyball' 
  | 'tennis' 
  | 'swimming' 
  | 'athletics' 
  | 'handball' 
  | 'rugby' 
  | 'hockey' 
  | 'other';

export interface CreateTeamRequest {
  name: string;
  sport: SportType;
  category: string;
  description?: string;
  color: string;
  playersCount: number;
}

export interface UpdateTeamRequest {
  name?: string;
  sport?: SportType;
  category?: string;
  description?: string;
  color?: string;
  playersCount?: number;
}

export const SPORT_LABELS: Record<SportType, string> = {
  football: 'Fútbol',
  basketball: 'Baloncesto',
  volleyball: 'Voleibol',
  tennis: 'Tenis',
  swimming: 'Natación',
  athletics: 'Atletismo',
  handball: 'Balonmano',
  rugby: 'Rugby',
  hockey: 'Hockey',
  other: 'Otro'
};

export const TEAM_COLORS = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#f59e0b', // amber-500
  '#eab308', // yellow-500
  '#84cc16', // lime-500
  '#22c55e', // green-500
  '#10b981', // emerald-500
  '#14b8a6', // teal-500
  '#06b6d4', // cyan-500
  '#0ea5e9', // sky-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#a855f7', // purple-500
  '#d946ef', // fuchsia-500
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
];