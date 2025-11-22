export interface Team {
  id?: number;
  position: number;
  name: string;
  teamId: number;
  logo?: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: string;
}
