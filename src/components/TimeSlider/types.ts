export interface HistoricalEvent {
  id: number;
  year: number; 
  title: string;
  description: string;
}

export interface TimeSegment {
  id: number;
  startYear: number;
  endYear: number; 
  events: HistoricalEvent[]; 
  category: string;
}