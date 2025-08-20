export interface Team {
  id: string;
  name: string;
  sport: Sport;
  category: string;
  color: TeamColor;
  playersCount: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamRequest {
  name: string;
  sport: Sport;
  category: string;
  color: TeamColor;
  playersCount: number;
  description?: string;
}

export interface UpdateTeamRequest {
  name: string;
  sport: Sport;
  category: string;
  color: TeamColor;
  playersCount: number;
  description?: string;
}

export type Sport = 
  | 'football' 
  | 'basketball' 
  | 'volleyball' 
  | 'tennis' 
  | 'swimming' 
  | 'athletics' 
  | 'handball' 
  | 'hockey' 
  | 'rugby' 
  | 'baseball';

export type TeamColor = 
  | 'blue' 
  | 'red' 
  | 'green' 
  | 'yellow' 
  | 'purple' 
  | 'orange' 
  | 'pink' 
  | 'indigo' 
  | 'teal' 
  | 'gray';

export const SPORT_LABELS: Record<Sport, string> = {
  football: 'Fútbol',
  basketball: 'Baloncesto',
  volleyball: 'Voleibol',
  tennis: 'Tenis',
  swimming: 'Natación',
  athletics: 'Atletismo',
  handball: 'Balonmano',
  hockey: 'Hockey',
  rugby: 'Rugby',
  baseball: 'Béisbol'
};

export const TEAM_COLORS: Record<TeamColor, { name: string; class: string; bg: string }> = {
  blue: { name: 'Azul', class: 'bg-blue-500', bg: 'bg-blue-100' },
  red: { name: 'Rojo', class: 'bg-red-500', bg: 'bg-red-100' },
  green: { name: 'Verde', class: 'bg-green-500', bg: 'bg-green-100' },
  yellow: { name: 'Amarillo', class: 'bg-yellow-500', bg: 'bg-yellow-100' },
  purple: { name: 'Morado', class: 'bg-purple-500', bg: 'bg-purple-100' },
  orange: { name: 'Naranja', class: 'bg-orange-500', bg: 'bg-orange-100' },
  pink: { name: 'Rosa', class: 'bg-pink-500', bg: 'bg-pink-100' },
  indigo: { name: 'Índigo', class: 'bg-indigo-500', bg: 'bg-indigo-100' },
  teal: { name: 'Verde azulado', class: 'bg-teal-500', bg: 'bg-teal-100' },
  gray: { name: 'Gris', class: 'bg-gray-500', bg: 'bg-gray-100' }
};

export const SPORT_OPTIONS: Array<{ value: Sport; label: string }> = [
  { value: 'football', label: SPORT_LABELS.football },
  { value: 'basketball', label: SPORT_LABELS.basketball },
  { value: 'volleyball', label: SPORT_LABELS.volleyball },
  { value: 'tennis', label: SPORT_LABELS.tennis },
  { value: 'swimming', label: SPORT_LABELS.swimming },
  { value: 'athletics', label: SPORT_LABELS.athletics },
  { value: 'handball', label: SPORT_LABELS.handball },
  { value: 'hockey', label: SPORT_LABELS.hockey },
  { value: 'rugby', label: SPORT_LABELS.rugby },
  { value: 'baseball', label: SPORT_LABELS.baseball }
];

export const COLOR_OPTIONS: Array<{ value: TeamColor; label: string; class: string; bg: string }> = [
  { value: 'blue', label: TEAM_COLORS.blue.name, class: TEAM_COLORS.blue.class, bg: TEAM_COLORS.blue.bg },
  { value: 'red', label: TEAM_COLORS.red.name, class: TEAM_COLORS.red.class, bg: TEAM_COLORS.red.bg },
  { value: 'green', label: TEAM_COLORS.green.name, class: TEAM_COLORS.green.class, bg: TEAM_COLORS.green.bg },
  { value: 'yellow', label: TEAM_COLORS.yellow.name, class: TEAM_COLORS.yellow.class, bg: TEAM_COLORS.yellow.bg },
  { value: 'purple', label: TEAM_COLORS.purple.name, class: TEAM_COLORS.purple.class, bg: TEAM_COLORS.purple.bg },
  { value: 'orange', label: TEAM_COLORS.orange.name, class: TEAM_COLORS.orange.class, bg: TEAM_COLORS.orange.bg },
  { value: 'pink', label: TEAM_COLORS.pink.name, class: TEAM_COLORS.pink.class, bg: TEAM_COLORS.pink.bg },
  { value: 'indigo', label: TEAM_COLORS.indigo.name, class: TEAM_COLORS.indigo.class, bg: TEAM_COLORS.indigo.bg },
  { value: 'teal', label: TEAM_COLORS.teal.name, class: TEAM_COLORS.teal.class, bg: TEAM_COLORS.teal.bg },
  { value: 'gray', label: TEAM_COLORS.gray.name, class: TEAM_COLORS.gray.class, bg: TEAM_COLORS.gray.bg }
];