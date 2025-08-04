export interface TimeSegment {
    id: number;
    year: number;
    events: Event[];
}

export interface Event {
    id: number;
    title: string;
    description: string;
}